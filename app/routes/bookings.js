var express = require('express')
var router = express.Router()
const auth = require('../../middleware')
const { getBookings, getBooking, deleteBooking, joinBooking, unjoinBooking, getSchedule } = require('../controllers/BookingController')

router.get('/bookings', auth, getBookings)
router.get('/bookings/:bookingId', auth, getBooking)
router.delete('/bookings/:bookingId', auth, deleteBooking)

router.put('/bookings/:bookingId/join', auth, joinBooking)
router.put('/bookings/:bookingId/unjoin', auth, unjoinBooking)
router.get('/schedules', auth, getSchedule)

module.exports = router
