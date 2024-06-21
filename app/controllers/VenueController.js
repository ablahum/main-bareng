const Venue = require('../models/Venue')
const Booking = require('../models/Booking')
const User = require('../models/User')
const Field = require('../models/Field')

const getVenues = async (req, res) => {
  const userId = req.user.id

  try {
    const user = await User.findByPk(userId)

    if (user.role !== 'owner')
      return res.status(401).json({
        message: 'you are not allowed to see all venue',
      })

    const venues = await Venue.findAll()

    return res.status(200).json({
      message: 'get all venues successful',
      data: venues,
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
      details: err.errors,
    })
  }
}

const getVenue = async (req, res) => {
  const userId = req.user.id
  const { venueId } = req.params

  try {
    const user = await User.findByPk(userId)

    if (user.role !== 'owner')
      return res.status(401).json({
        message: 'you are not allowed to see this venue',
      })

    const venue = await Venue.findByPk(venueId)

    if (!venue)
      return res.status(404).json({
        message: 'venue not found',
      })

    return res.status(200).json({
      message: 'get venue successful',
      data: venue,
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
      details: err.errors,
    })
  }
}

const createVenue = async (req, res) => {
  const userId = req.user.id
  const { name, address, phone } = req.body

  try {
    const user = await User.findByPk(userId)

    if (user.role !== 'owner')
      return res.status(401).json({
        msg: 'only owner can add new venue',
      })

    const venue = await Venue.create({
      name,
      address,
      phone,
      user_id: user.id,
    })

    return res.status(201).json({
      message: 'create venue successful',
      data: venue,
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
      details: err.errors,
    })
  }
}

const updateVenue = async (req, res) => {
  const userId = req.user.id
  const { name, address, phone } = req.body
  const { venueId } = req.params

  try {
    const user = await User.findByPk(userId)

    if (user.role !== 'owner')
      return res.status(401).json({
        msg: 'only owner can edit venue',
      })

    const venue = await Venue.findByPk(venueId)

    if (!venue)
      return res.status(404).json({
        message: 'invalid venue id',
      })

    venue.set({
      name,
      address,
      phone,
      user_id: user.id,
    })
    await venue.save()

    return res.status(200).json({
      message: 'update venue successful',
      data: venue,
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
      details: err.errors,
    })
  }
}

const bookingField = async (req, res) => {
  const { play_date_start, play_date_end } = req.body
  const userId = req.user.id
  const { fieldId } = req.params

  try {
    const field = await Field.findByPk(fieldId)

    if (!field)
      return res.status(404).json({
        message: 'field not found',
      })

    // validasi saat field tidak tersedia untuk disewa

    const booking = await Booking.create({
      user_id: userId,
      field_id: field.id,
      play_date_start,
      play_date_end,
    })

    return res.status(201).json({
      message: 'booking field successful',
      data: booking,
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
      details: err.errors,
    })
  }
}

module.exports = {
  getVenues,
  getVenue,
  createVenue,
  updateVenue,
  bookingField,
}
