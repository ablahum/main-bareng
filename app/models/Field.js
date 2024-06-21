const { DataTypes } = require('sequelize')
const sequelize = require('../../db')

const Field = sequelize.define(
  'Field',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    venue_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Venues',
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
  }
)

module.exports = Field
