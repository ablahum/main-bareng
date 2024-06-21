var express = require('express')
var router = express.Router()
const auth = require('../../middleware')
const { getBookings, getBooking, updateBooking, deleteBooking, getSchedule } = require('../controllers/BookingController')

router.get('/bookings', auth, getBookings)
router.get('/bookings/:bookingId', auth, getBooking)
router.put('/bookings/:bookingId', auth, updateBooking)
router.delete('/bookings/:bookingId', auth, deleteBooking)
router.get('/schedules', auth, getSchedule)

module.exports = router
