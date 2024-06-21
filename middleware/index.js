const jwt = require('jsonwebtoken')

const { JWT_SECRET } = process.env

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token')

  if (!token)
    return res.status(401).json({
      msg: 'no token, access denied',
    })

  // const authHeader = req.headers.authorization

  // if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ msg: 'no token, authorization denied' })

  // const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json({ msg: 'token is invalid' })
  }
}
