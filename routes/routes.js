const express = require('express');
const { isAuth } = require('../middlewares/isAuth');
const { redirectHome } = require('../middlewares/redirectHome');
const { validateUsernameOrEmail } = require('../middlewares/validateRegister');
const userController = require('../controllers/user.controller');
const heroController = require('../controllers/hero.controller');
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

router.post('/register', validateUsernameOrEmail, userController.register);

router.post('/login', redirectHome, userController.login);

router.get('/get-heroes', heroController.getHeroes);

module.exports = router;
