var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const sequelize = require('./db')

const authRoutes = require('./app/routes/auth')
const venueRoutes = require('./app/routes/venues')
const bookingRoutes = require('./app/routes/bookings')

var app = express()

sequelize.sync()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', authRoutes)
app.use('/api', venueRoutes)
app.use('/api', bookingRoutes)

module.exports = app
