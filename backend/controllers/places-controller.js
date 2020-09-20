const HttpError = require('../models/http-error')
const { v4: uuidv4 } = require('uuid');

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

const getPlaceById = (req, res, next) => {
    const placeid = req.params.placeid;
    const place = DUMMY_PLACES.find((place) => place.id === placeid);
    if (!place) {
        throw new HttpError('Could not find a place for the provided id', 404)
    }
    res.json({ place })
};

const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.userId;
    const places = DUMMY_PLACES.filter((place) => place.creator === userId);
    if (!places || places.length === 0) {
        return next(
            new HttpError('Could not find a places for the provided userid.', 404)
        );
    }
    res.json({ places });
};

const createPlace = (req, res, next) => {
    const { title, description, coordinates, address, creator } = req.body;
    const createdPlace = {
        id : uuidv4(),
        title,
        description,
        location: coordinates,
        address,
        creator
    }
    DUMMY_PLACES.push(createdPlace)
    res.status(201).json(createdPlace)
}

const updatePlace = (req, res, next) => {
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
    DUMMY_PLACES = DUMMY_PLACES.filter(p=> p.id !== placeid)
    console.log(DUMMY_PLACES)
    res.status(200).json({message : "Place deleted"})
}


exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId
exports.createPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace