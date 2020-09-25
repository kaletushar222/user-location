const { Router } = require('express');
const { check } = require('express-validator')

const router = Router();

const placesControllers = require('../controllers/places-controllers')


router.get("/:placeid", placesControllers.getPlaceById);
router.get("/user/:userId", placesControllers.getPlacesByUserId);
// router.patch('/:pid')

router.post("/", 
    [
        check('title').not().isEmpty(),
        check('description').isLength({ min:5}),
        check('address').not().isEmpty()
    ],
    placesControllers.createPlace
)

router.patch('/:pid', 
    [
        check('title').not().isEmpty(),
        check('description').isLength({ min: 5 })
    ],
    placesControllers.updatePlace
)

router.delete('/:pid', placesControllers.deletePlace)
module.exports = router;
