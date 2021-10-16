const express = require('express');
const { isAuth } = require('../middlewares/isAuth');
const { redirectHome } = require('../middlewares/redirectHome');
const { validateUsernameOrEmail } = require('../middlewares/validateRegister');
const controller = require('../controllers/user.controller');
const router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log(req.originalUrl);
  next();
});

router.get('/', isAuth, (req, res) => {
  res.render('home', { name: req.session.name });
});

router.get('/login', redirectHome, (req, res) => {
  res.render('login');
});

router.get('/register', redirectHome, (req, res) => {
  res.render('register');
});

router.get('/game', (req, res) => {
  res.render('game', { name: req.session.name });
});

router.post('/register', validateUsernameOrEmail, controller.register);

router.post('/login', redirectHome, controller.login);

module.exports = router;
