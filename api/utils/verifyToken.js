const jwt = require('jsonwebtoken')
module.exports.verifyToken = (req, res, next) => {
   try {
      const { authorization } = req.headers
      if (!authorization) throw new Error('No me mandaste nada.')
      const decodedToken = jwt.verify(authorization, process.env.SECRET_OR_KEY)
      console.log(decodedToken)
      req.user = decodedToken._doc
      next()
   } catch (e) {
      res.json({ success: false, error: e.message })
   }
}
