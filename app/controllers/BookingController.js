const Booking = require('../models/Booking')
const User = require('../models/User')

const getBookings = async (req, res) => {
  const userId = req.user.id

  try {
    const user = await User.findByPk(userId)

    if (!user)
      return res.status(401).json({
        message: 'you are not allowed to see all bookings',
      })

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
  const userId = req.user.id
  const { bookingId } = req.params

  try {
    const user = await User.findByPk(userId)

    if (!user)
      return res.status(401).json({
        message: 'you are not allowed to see all bookings',
      })

    const booking = await Booking.findByPk(bookingId)

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

const updateBooking = async (req, res) => {
  const { bookingId } = req.params
  const userId = req.user.id
  const { field_id, play_date_start, play_date_end } = req.body

  try {
    const booking = await Booking.findByPk(bookingId)

    if (!booking)
      return res.status(404).json({
        message: 'booking not found',
      })

    if (booking.user_id === userId)
      return res.status(401).json({
        message: 'you are not allowed to delete this booking',
      })

    booking.set({
      user_id: userId,
      field_id,
      play_date_start,
      play_date_end,
    })
    await booking.save()

    return res.status(200).json({
      message: 'update booking successful',
      data: booking,
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
      details: err.errors,
    })
  }
}

const deleteBooking = async (req, res) => {
  const { bookingId } = req.params
  const userId = req.user.id

  try {
    const booking = await Booking.findByPk(bookingId)

    if (!booking)
      return res.status(404).json({
        message: 'booking not found',
      })

    if (booking.user_id === userId)
      return res.status(401).json({
        message: 'you are not allowed to delete this booking',
      })

    booking.destroy()

    return res.status(200).json({
      message: 'delete booking successful',
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
  updateBooking,
  deleteBooking,
  getSchedule,
}
