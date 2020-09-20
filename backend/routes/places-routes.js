const express = require("express");
const router = express.Router();
const placesControllers = require('../controllers/places-controllers')

router.get("/:placeid", placesControllers.getPlaceById);
router.get("/user/:userId", placesControllers.getPlacesByUserId);
// router.patch('/:pid')

router.post("/", placesControllers.createPlace)

router.patch('/:pid', placesControllers.updatePlace)

router.delete('/:pid', placesControllers.deletePlace)
module.exports = router;
