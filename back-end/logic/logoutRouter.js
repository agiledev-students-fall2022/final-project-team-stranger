const express=require("express")
const LogoutRouter = express.Router();

LogoutRouter.get('/logout', function(req, res, next) {
    // remove the req.user property and clear the login session
    req.logout();
  
    // destroy session data
    req.session = null;
  
    // redirect to homepage
    res.redirect('/sign-in');
  });

  module.exports = LogoutRouter