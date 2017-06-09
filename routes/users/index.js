const express = require('express');
const router = express.Router();

// user login
router.get('/', (req, res) => {
	res.send('login');
});

module.exports = router;

function timeOfDay(user) {
	let date = new Date(),
		greet = '';

	if (date.getHours() >= 0 && date.getHours() < 12 && date.getMinutes() <= 59) {
		greet = 'Good morning ' + cfc(user.fname);
	} else if (date.getHours() >= 12 && date.getHours() <= 17 && date.getMinutes() <= 59) {
		greet = 'Good afternoon ' + cfc(user.fname);
	} else {
		greet = 'Good evening ' + cfc(user.fname);
	}

	return greet;
}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		req.flash('errors', ['You must be logged in to access this resource']);
		res.redirect('/users/signin');
	}
}

function notLoggedIn(req, res, next) {
	if (!req.isAuthenticated()) {
		res.redirect('/users/signin');
	} else {
		next();
	}
}
