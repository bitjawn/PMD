const express = require('express');
const router = express.Router();

// all
router.get('/', (req, res) => {
	res.send('all profiles');
});

module.exports = router;

function log(data) {
	if (null != data && undefined != data && 'undefined' != data) {
		console.log(data);
	}
}

function postDate() {
	let date = new Date();
	return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
}

function postTime() {
	let date = new Date();
	return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
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
