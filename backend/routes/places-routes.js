const express = require("express");

const router = express.Router();

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

router.get("/:placeid", (req, res, next) => {
  const placeid = req.params.placeid;
  const place = DUMMY_PLACES.find((place) => place.id === placeid);
  if (!place) {
		const error = new Error('Could not find requested place')
		error.code = 404
		throw error;
  }
  res.json({ place });
});

router.get("/user/:userId", (req, res, next) => {
  const userId = req.params.userId;
  const place = DUMMY_PLACES.find((place) => place.creator === userId);
  if (!place) {
    const error = new Error('Could not find requested place')
		error.code = 404
		return next(error)
  }
  res.json({ place });
});

module.exports = router;
