const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../db')
const User = require('./User')
const Booking = require('./Booking')
const UserBooking = require('./UserBooking')
const Venue = require('./Venue')
const Field = require('./Field')

const db = {}

db.User = User(sequelize, DataTypes)
db.Booking = Booking(sequelize, DataTypes)
db.UserBooking = UserBooking(sequelize, DataTypes)
db.Venue = Venue(sequelize, DataTypes)
db.Field = Field(sequelize, DataTypes)

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.Sequelize = Sequelize
db.sequelize = sequelize

module.exports = db
