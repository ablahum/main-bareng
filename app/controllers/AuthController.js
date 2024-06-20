const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const register = async (req, res) => {
  const { name, email, password, role } = req.body

  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    })

    return res.status(201).json({
      message: 'register successful',
      data: user,
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
      details: err.errors,
    })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ where: { email } })
    const isMatch = await bcrypt.compare(password, user.password)

    if (!user || !isMatch)
      return res.status(404).json({
        msg: 'invalid credentials',
      })

    const payload = {
      id: user.id,
      email: user.email,
      password: user.password,
    }

    jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err

      res.json({
        msg: 'login successful',
        data: user,
        token,
      })
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
      details: err.errors,
    })
  }
}

module.exports = {
  register,
  login,
}
