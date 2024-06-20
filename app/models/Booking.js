const { DataTypes } = require('sequelize')
const sequelize = require('../../db')

const Booking = sequelize.define(
  'Booking',
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    play_date_start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    play_date_end: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
)

module.exports = Booking
