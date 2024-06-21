var express = require('express')
var router = express.Router()
const auth = require('../../middleware')
const { getVenues, getVenue, createVenue, updateVenue, bookingField } = require('../controllers/VenueController')

router.get('/venues', auth, getVenues)
router.get('/venues/:venueId', auth, getVenue)
router.post('/venues', auth, createVenue)
router.put('/venues/:venueId', auth, updateVenue)
router.post('/:fieldId/bookings', auth, bookingField)

module.exports = router
