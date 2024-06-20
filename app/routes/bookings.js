var express = require('express')
var router = express.Router()
const { getBookings, getBooking, getSchedule } = require('../controllers/BookingController')

router.get('/bookings', getBookings)
router.get('/bookings/:id', getBooking)
router.get('/schedules', getSchedule)

module.exports = router
