module.exports = (sequelize, DataTypes) => {
  const UserBooking = sequelize.define(
    'user_booking',
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      booking_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Bookings',
          key: 'id',
        },
      },
    },
    {
      timestamps: false,
    }
  )

  return UserBooking
}
