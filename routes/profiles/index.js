const express = require('express');
const router = express.Router();
const Profile = require('../../models/profile');
const cfc = require('../../modules/cfc');
const strU = require('../../modules/strUtils');

// list
router.get('/', (req, res) => {
	let success = req.flash('success') || [];
	let error = req.flash('errors') || [];
	let warning = req.flash('warnings') || [];

	Profile.find({}, (err, profiles) => {
		res.render('profiles/list', {
			title:cfc('profiles'),
			profiles:profiles,
			hasSuccess:success.length > 0,
			success:success,
			hasWarning: warning.length > 0,
			warning:warning,
			hasError: error.length > 0,
			error:error});
		});
});

// view
router.get('/profile/:id', (req, res) => {
	Profile.findById(req.params.id, (err, profile) => {
		res.render('profiles/profile', {title:cfc(profile.title), profile:profile});
	});
});

// add
router.post('/add', (req, res) => {
	let title = req.body.title;
	let uname = req.body.username || '';
	let pwd = req.body.password || '';
	let email = req.body.email || '';
	let url = (req.body.url)? (strU.hasHTTP(req.body.url)? req.body.url : 'http://' + req.body.url) : '';
	let description = req.body.description;
	let organization = req.body.organization;

	let profile = new Profile();
	profile.title = title;
	profile.username = uname;
	profile.password = pwd;
	profile.email = email;
	profile.url = url;
	profile.description = description;
	profile.postDate = postDate();
	profile.postTime = postTime();
	profile.organization = organization;

	profile.save(function(err){
		if (err) {
			console.log(err);
			return;
		} else {
			req.flash('success', 'Profile Added');
			res.redirect('/profiles');
		}
	});

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
