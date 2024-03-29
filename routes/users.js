const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');
const { checkReturnTo } = require('../middleware');

router.route('/signup')
  .get(users.renderSignup)
  .post(catchAsync (users.signup));

router.route('/login')
  .get(users.renderLogin)
  .post(checkReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

router.get('/logout', users.logout);

module.exports = router;