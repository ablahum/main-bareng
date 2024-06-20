const Booking = require('../models/Booking')

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll()

    return res.status(200).json({
      message: 'get all bookings successful',
      data: bookings,
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
      details: err.errors,
    })
  }
}

const getBooking = async (req, res) => {
  const { id } = req.params

  try {
    const booking = await Booking.findByPk(id)

    if (!booking)
      return res.status(404).json({
        message: 'booking not found',
      })

    return res.status(200).json({
      message: 'get booking successful',
      data: booking,
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
      details: err.errors,
    })
  }
}

const getSchedule = async (req, res) => {
  const userId = req.user.id

  try {
    const bookings = await Booking.findAll({
      where: {
        user_id: userId,
      },
    })

    return res.status(200).json({
      message: 'get your schedule successful',
      data: bookings,
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
      details: err.errors,
    })
  }
}

module.exports = {
  getBookings,
  getBooking,
  getSchedule,
}
