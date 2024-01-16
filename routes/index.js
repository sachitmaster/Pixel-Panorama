var express = require('express');
var router = express.Router();
const userModel = require('./users');
const postModel = require('./posts')
const LocalStrategy = require('passport-local')
const passport = require('passport');
const upload = require ('./multer')

passport.use(new LocalStrategy(userModel.authenticate()))

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index');
});

router.get('/signup', function (req, res) {
  res.render('signup');
});

router.get('/profile', isLoggedIn, function (req, res) {
  res.render('profile', { user: req.user, user: req.user });
});

router.get('/card1', isLoggedIn, function (req, res) {
  res.render('card1');
});

router.get('/card2', function (req, res) {
  res.render('card2');
});

router.get('/card3', function (req, res) {
  res.render('card3');
});

router.get('/About', function (req, res) {
  res.render('about');
});

router.get('/create', isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({
    username: req.session.passport.user
  })
  .populate("posts")

  // console.log(user)

  res.render('create', {user}); 
});

router.post('/upload', isLoggedIn, upload.single("file"), async function (req, res, next){
  if(!req.file){
    return res.send(404).send("No file found")
  }
  const user = await userModel.findOne({username: req.session.passport.user})
  const post = await postModel.create({
    image: req.file.filename,
    imageText: req.body.imagecaption,
    user: user._id,
  })
  user.posts.push(post._id)
  await user.save() 
  res.redirect('/create') 
});

// register route
router.post('/register', function (req, res) {

  // console.log("" + req.body)

  const userdata = new userModel({
    username: req.body.username,
    email: req.body.email,
  })

  // const uname = req.body.username
  // console.log(userdata)

  userModel.register(userdata, req.body.password)
    .then(function (registereduser) {

      // console.log("Registered user data: " + registereduser)
      // console.log("password" + req.body.password)

      passport.authenticate('local')(req, res, function () {
        res.redirect('/profile')
      })
    })
    .catch(function (err) {
      console.log("If error occure: " + err)
    })
})

// login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/'
}), function (req, res) {
  // const uname = req.body.username
})

// logout
router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
})

// IsLoggedIn Middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/')
}

module.exports = router;
