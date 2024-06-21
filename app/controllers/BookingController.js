const { Booking, User, UserBooking } = require('../models')

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

const deleteBooking = async (req, res) => {
  const { bookingId } = req.params
  const userId = req.user.id

  try {
    const booking = await Booking.findByPk(bookingId)

    if (!booking)
      return res.status(404).json({
        message: 'booking not found',
      })

    if (booking.user_id !== userId)
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

const joinBooking = async (req, res) => {
  const { bookingId } = req.params
  const userId = req.user.id

  try {
    const booking = await Booking.findByPk(bookingId)

    if (!booking)
      return res.status(404).json({
        message: 'booking not found',
      })

    const user = await User.findByPk(userId)

    if (!user)
      return res.status(404).json({
        message: 'user not found',
      })

    await booking.addUser(user)

    res.status(200).json({
      message: 'successfully joined the booking',
      data: { user, booking },
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
      details: err.errors,
    })
  }
}

const unjoinBooking = async (req, res) => {
  const { bookingId } = req.params
  const userId = req.user.id

  try {
    const booking = await Booking.findByPk(bookingId)

    if (!booking)
      return res.status(404).json({
        message: 'booking not found',
      })

    const user = await User.findByPk(userId)

    if (!user)
      return res.status(404).json({
        message: 'user not found',
      })

    await booking.removeUser(user)

    res.status(200).json({
      message: 'successfully unjoin the booking',
      data: { user, booking },
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
    const bookings = await UserBooking.findAll({
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
  deleteBooking,
  joinBooking,
  unjoinBooking,
  getSchedule,
}
