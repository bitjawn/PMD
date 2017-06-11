const express = require('express');
const router = express.Router();
const cfc = require('../../modules/cfc');
const csrf = require('csurf');
const csrfProtection = csrf();
const passport = require('passport');

// user login
router.get('/profile', isLoggedIn, (req, res) => {
	let fname = req.user.fname;
	let lname = req.user.lname;
	let uname = req.user.uname;
	let email = req.user.email;
	let picture = req.user.picture || '';
	let greet = timeOfDay(req.user);

	res.render('users/profile', {
		title:cfc(req.user.fname),
		 fname:fname,
		 lname:lname,
		 uname:uname,
		 email:email,
		 picture:picture,
		 greeting:greet
		});
});


// logout
router.get('/signout', csrfProtection, isLoggedIn, function(req, res){
	req.logout();
	res.redirect('/users/signin');
});

// redirection
router.get('/', notLoggedIn, (req, res, next) => {
	next();
});

// signin
router.get('/signin', csrfProtection, (req, res) => {
	let messages = req.flash('errors') || [];

	res.render('users/signin', {
		title:cfc('signin'),
		csrfToken:req.csrfToken(),
		hasErrors:messages.length > 0,
		errors:messages
	});
});

router.post('/signin', csrfProtection, passport.authenticate('local.signin', {
	successRedirect: '/users/profile',
	failureRedirect: '/users/signin',
	failureFlash: true
}));

// signup
router.get('/signup', csrfProtection, (req, res) => {
	let messages = req.flash('errors') || [];
	res.render('users/signup', {
		title:cfc('signup'),
		csrfToken:req.csrfToken(),
		isAdmin:false,
		hasErrors:messages.length > 0,
		errors:messages
	});
});

router.post('/signup', csrfProtection, passport.authenticate('local.signup', {
    successRedirect: '/users/signin',
    failureRedirect: '/users/signup',
    failureFlash: true
}));



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
