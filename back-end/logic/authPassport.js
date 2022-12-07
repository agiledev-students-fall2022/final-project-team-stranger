require("dotenv").config({ silent: true }) 
const { default: mongoose } = require("mongoose")
const passportJWT = require("passport-jwt")
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt") 
jwtOptions.secretOrKey = `${process.env.REACT_APP_AUTH_TOKEN}`

// JWT Strategy  
const jwtStrategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  // console.log("JWT payload received", jwt_payload) // debugging

  // Find User Within DB 
  const UserFinder = mongoose.model("User")
  const user = UserFinder.findOne({"_id" : jwt_payload._id}).exec((err, data) => {
    if (err) {
      next(null, false)
    } else {
      next(null, data)
    }
  })
})

module.exports = {
  jwtOptions,
  jwtStrategy,
}
