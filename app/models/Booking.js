module.exports = (sequelize, DataTypes) => {
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
      field_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Fields',
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

  Booking.associate = function (models) {
    Booking.belongsToMany(models.User, { through: 'user_booking', foreignKey: 'booking_id' })
  }

  return Booking
}
