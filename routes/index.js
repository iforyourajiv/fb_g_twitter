var express = require('express');
var router = express.Router();

var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;

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


router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'read_stream' }));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/auth/facebook/callback',passport.authenticate('facebook', { 
                                      failureRedirect: '/login' }),(req,res)=>{
                                        console.log("PPPPPPPPPPPPPPPPPPPPPPPP",req.user)
                                        res.send("Hello");
                                      });



  // Google 
  passport.use(new GoogleStrategy({
    clientID: '651067110700-u4qbahno8bgvc612rral8bap3q1ajakp.apps.googleusercontent.com',
    clientSecret: 'tHfXT0Z0ePYF975QL13DVDeB',
    callbackURL: "https://rajiv-login-fbgt.herokuapp.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {

    console.log(profile)
    return cb(null,profile)
  }
));


router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));


router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    console.log("ppppppppppppp",req.user)
    res.send("hello");
  });



  // Twitter 

  passport.use(new TwitterStrategy({
    consumerKey: 'XjTY2rkQeHoncDo7e3pcspvsi',
    consumerSecret:'3SzgsXXxTIskUTtVukIZOcLBNovtBOSlZ8DfUcYwxsO4H74iwf',
    callbackURL: "https://rajiv-login-fbgt.herokuapp.com/auth/twitter/callback"
  },

  function(accessToken, refreshToken, profile, cb) {

    console.log(profile)
    return cb(null,profile)
  }
));


router.get('/auth/twitter', passport.authenticate('twitter'));


router.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    console.log("ppppppppppppp",req.user)
    res.send("hello");
  });



module.exports = router;
