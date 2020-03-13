var express = require('express');
var router = express.Router();

var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;

  passport.use(new FacebookStrategy({
    clientID: '638229720087425',
    clientSecret: 'd3c92916de6e20ff5e4c5df9c2e60ebc',
    callbackURL: "https://rajiv-login-fbgt.herokuapp.com/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email','profileUrl']
  },
  function(accessToken, refreshToken, profile, cb) {

    console.log(profile)
    return cb(null,profile)
  }
));
  


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

router.get('/login', function(req, res, next) {
  res.send("Failed");
});


router.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/auth/facebook/callback',passport.authenticate('facebook', { 
                                      failureRedirect: '/login' }),(req,res)=>{
                                        console.log("PPPPPPPPPPPPPPPPPPPPPPPP",req.user)
                                        res.send("Hello");
                                      });



module.exports = router;
