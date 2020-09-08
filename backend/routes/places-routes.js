const express = require("express");
const router = express.Router();
const placesControllers = require('../controllers/places-controller')
const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Tukai darshan hill",
    description: "One of the best hill",
    imageUrl: "https://source.unsplash.com/user/erondu/likes/1600x900",
    address: "Hadapsar Gaon, Hadapsar, Pune, Maharashtra 411028",
    location: {
      lat: 18.511304,
      lng: 73.9228,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Tukai darshan hill",
    description: "One of the best hill",
    imageUrl: "https://source.unsplash.com/user/mike/likes/1600x900",
    address: "Hadapsar Gaon, Hadapsar, Pune, Maharashtra 411028",
    location: {
      lat: 18.511304,
      lng: 73.9228,
    },
    creator: "u2",
  },
];

router.get("/:placeid", placesControllers.getPlaceById);
router.get("/user/:userId", placesControllers.getPlaceByUserId);

router.post("/", placesControllers.createPlace)
module.exports = router;
