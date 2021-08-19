const express = require('express');
const passport = require('passport');
const { nextTick } = require('process');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users');


router.route('/register')
.get(users.renderRegister)
.post(catchAsync(users.register))

router.route('/login')
.get(users.renderlogin)
.post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (users.login))


router.get('/logout', users.logout)

module.exports = router;