var express = require('express')
var router = express.Router()
const { getVenues, getVenue, createVenue, updateVenue, bookingVenue } = require('../controllers/VenueController')

router.get('/', getVenues)
router.get('/:id', getVenue)
router.post('/', createVenue)
router.put('/:id', updateVenue)
router.post('/:id/bookings', bookingVenue)

module.exports = router
