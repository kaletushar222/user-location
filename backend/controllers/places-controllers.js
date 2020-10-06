const HttpError = require('../models/http-error')
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const getCoordsForAddress = require('../util/location');
const Place = require('../models/place')
let DUMMY_PLACES =[
    {
        id : 'p1',
        title: 'Tukai darshan hill',
        description : "One of the best hill",
        imageUrl :"https://source.unsplash.com/user/erondu/likes/1600x900",
        address : "Hadapsar Gaon, Hadapsar, Pune, Maharashtra 411028",
        location : {
            lat  : 18.511304, 
            lng : 73.922800
        },
        creator : "u1"
    },
    {
        id : 'p2',
        title: 'Magar patta corner',
        description : "Best food stalls",
        imageUrl :"https://source.unsplash.com/user/mike/likes/1600x900",
        address : "Magarpatta,  Pune, Maharashtra 411028",
        location : {
            lat  : 28.511304, 
            lng : 73.922800
        },
        creator : "u2"
    },
    {
        id : 'p1',
        title: 'Ramdara',
        description : "God Ram temple ",
        imageUrl :"https://source.unsplash.com/user/erondu/likes/1600x900",
        address : "Loni kalbor",
        location : {
            lat  : 58.511304, 
            lng : 73.922800
        },
        creator : "u1"
    },
]

const getPlaceById = async(req, res, next) => {
    const placeid = req.params.placeid;
    console.log("placeid : ",placeid)
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

    try{
        await createdPlace.save()
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

const updatePlace = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        console.log(errors)
        return next(new HttpError('Invalid inputes passed check data', 422))
    }
    const { title, description } = req.body;
    const placeid = req.params.pid;
    const updatedPlace = { ...DUMMY_PLACES.find(place=> place.id == placeid)}
    const placeIndex = DUMMY_PLACES.findIndex(place=> place.id == placeid)
    updatedPlace.title = title
    updatedPlace.description = description
    
    DUMMY_PLACES[placeIndex] = updatePlace
    res.status(200).json({place : updatedPlace})
}

const deletePlace = (req, res, next) =>{
    const placeid = req.params.pid;
    if(!DUMMY_PLACES.find(p=> p.id === placeid)){
        return(new HttpError('Could not find a place for that id.', 404))
    }
    DUMMY_PLACES = DUMMY_PLACES.filter(p=> p.id !== placeid)
    console.log(DUMMY_PLACES)
    res.status(200).json({message : "Place deleted"})
}


exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId
exports.createPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace