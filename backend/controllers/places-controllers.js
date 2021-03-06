const HttpError = require('../models/http-error')
const { v4: uuidv4 } = require('uuid');
const mongoose = require("mongoose");
const { validationResult } = require('express-validator');

const getCoordsForAddress = require('../util/location');
const Place = require('../models/place')
const User = require('../models/user');

const getPlaceById = async(req, res, next) => {
    const placeid = req.params.placeid;
    //console.log("placeid : ",placeid)
    let place;
    try{
        place = await Place.findById(placeid);
    }
    catch(err){
        console.log(err);
        const error = new HttpError("Something wend wrong, Cannot find place", 500)
        return next(error);
    }

    if (!place) {
        const error = new HttpError('Could not find a place for the provided id', 404)
        return next(error)
    }
    res.json({ place: place.toObject( {getters: true}) });
};

const getPlacesByUserId = async(req, res, next) => {
    const userId = req.params.userId;
    let places;
    try{
        places =await Place.find({creator : userId})
    }
    catch(err){
        console.log("err : ", err)
        const error = new HttpError("Could not find place", 500)
        return next(error)
    }
    if (!places || places.length === 0) {
        return next(
            new HttpError('Could not find a places for the provided userid.', 404)
        );
    }
    res.json({ places: places.map(place => place.toObject({ getters: true})) });
};

const createPlace = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return next(new HttpError('Invalid inputes passed check data', 422))
    }
    const { title, description, address, creator } = req.body;
    
    let coordinates
    try {
        coordinates = await getCoordsForAddress(address);
    }
    catch(error){
        return next(error)
    }

    const createdPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image : 'https://images.unsplash.com/photo-1589906614010-1d2dc34ed77e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
        creator
    })

    let user;
    try{
        user = await User.findById(creator)
    }
    catch(err){
        console.log(err)
        const error = new HttpError('Creating place failed, please try again', 500);
        return next(error);
    }

    if(!user){
        const error= new HttpError('Could not find user for provided id', 404)
        return next(error);
    }

    //console.log(user)
    try{
        const sess = await mongoose.startSession()
        sess.startTransaction();
        await createdPlace.save({session: sess})
        user.places.push(createPlace)
        await user.save({ session: sess });
        await sess.commitTransaction();
    }
    catch (err){
        console.log(err)
        const error = new HttpError(
            'Creating place failed, Please try again.',
            500
        );
        return next(error);
    }

    res.status(201).json(createdPlace)
}

const updatePlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }
    const { title, description } = req.body;
    const placeId = req.params.pid;
    let place;
    try {
        place = await Place.findById(placeId);
    } 
    catch (err) {
        const error = new HttpError('Something went wrong, could not update place.',500);
        return next(error);
    }
  
    place.title = title;
    place.description = description;
    try {
        await place.save();
    } 
    catch (err) {
        const error = new HttpError('Something went wrong, could not update place.',500);
        return next(error);
    }
    res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) =>{
    const placeId = req.params.pid;
    //console.log("placeId : ",placeId)
    let place;
    try{
        place = await Place.findById(placeId).populate('creator')
        console.log("place : ",place)
    }
    catch(err){
        const error = new HttpError('Somthing went wrong, could not delete place', 500)
        return next(error);
    };
    if(!place){
        const error = new HttpError("could not find place for this id", 404)
        return next(error)
    }

    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await place.remove({session: sess});
        place.creator.places.pull(place);
        await place.creator.save({session: sess});
        await sess.commitTransaction();
    }   
    catch(err){
        const error = new HttpError('Somthing went wrong')
        return next(error)
    }

    res.status(200).json({message: 'Deleted Place'});
}


exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId
exports.createPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace