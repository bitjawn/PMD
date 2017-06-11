const express = require('express');
const router = express.Router();
const Profile = require('../../models/profile');
const User = require('../../models/user');
const cfc = require('../../modules/cfc');
const strU = require('../../modules/strUtils');
const chalk = require('chalk');

// list
router.get('/', isLoggedIn, (req, res) => {
	let success = req.flash('success') || [];
	let error = req.flash('error') || [];
	let warning = req.flash('warning') || [];

	Profile.findByAuthor(req.user.id, (err, profiles) => {
		if (err) {
			error(err);
		}
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
	Profile.findById(req.params.id, (err, prf) => {
		if (err) {
			error(err);
			return;
		}

		User.findById(prf.author, (err, user) => {
			let profile = {};
			profile.title = prf.title;
			profile.user = user.fname + ' ' + user.lname;
			profile.username = prf.username || '';
			profile.password = prf.password || '';
			profile.email = prf.email || '';
			profile.url = prf.url || '';
			profile.description = prf.description;
			profile.postDate = prf.postDate;
			profile.postTime = prf.postTime;
			profile.organization = prf.organization;
			profile.id = prf.id;

			res.render('profiles/profile', {title:cfc(profile.title), profile:profile});
		});
	});
});

// add
router.post('/add', isLoggedIn, (req, res) => {
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
	profile.author = req.user.id;

	profile.save(function(err){
		if (err) {
				switch (err.code.toString()) {
					case '11000':
						req.flash('error', 'Title already used');
						res.redirect('/profiles');
					break;

					default:
						req.flash('error', err.errmsg);
						res.redirect('/profiles');
					break;
				}
		} else {
			req.flash('success', 'Profile Added');
			res.redirect('/profiles');
		}
	});

});

// edit
router.get('/profile/edit/:id', isLoggedIn, (req, res) => {
	Profile.findById(req.params.id, (err, profile) => {
		if (err) {
			error(err);
			return;
		}
		res.render('profiles/edit', {title:cfc(profile.title), profile:profile});
	});
});

router.post('/profile/edit/:id', (req, res) => {
	let profile = {};
	profile.title = req.body.title;
	profile.username = req.body.username || '';
	profile.password = req.body.password || '';
	profile.email = req.body.email || '';
	profile.url = (req.body.url)?(strU.hasHTTP(req.body.url)?req.body.url:'http://' + req.body.url):'';
	profile.description = req.body.description;
	profile.postDate = req.body.postDate;
	profile.postTime = req.body.postTime;
	profile.author = req.body.author;
	profile.organization = req.body.organization;

	let query = {_id:req.params.id};

	Profile.update(query, profile, (err) => {
		if (err) {
			error(err);
			return;
		} else {
			req.flash('success', req.body.title + ' updated');
			res.redirect('/profiles');
		}
	});
});

// delete
router.delete('/profile/delete/:id', isLoggedIn, (req, res) => {
	let query = {_id:req.params.id};

	Profile.remove(query, (err) => {
		if (err) {
			error(err);
		} else {
			req.flash('success', 'Profile deleted');
			res.send('success');
		}
	});
});

// search
router.post('/search', isLoggedIn, (req, res) => {
	let keyword = req.body.search;
	let type = req.body.type;
	let result = null;

	switch (type) {
		case 'title':
			Profile.findByTitle(keyword, req.user.id, (err, prf) => {
				if (err) {
					error(err);
					return;
				}

				if (null != prf && undefined != prf && 'undefined' != prf) {
					User.findById(prf.author, (err, user) => {
						if (err) {
							console.log(err);
						} else {
							let profile = {};
							profile.title = prf.title;
							profile.user = user.fname + ' ' + user.lname;
							profile.username = prf.username || '';
							profile.password = prf.password || '';
							profile.email = prf.email || '';
							profile.url = prf.url || '';
							profile.description = prf.description;
							profile.postDate = prf.postDate;
							profile.postTime = prf.postTime;
							profile.organization = prf.organization;
							profile.id = prf.id;

							res.render('profiles/profile', {title:cfc(profile.title), profile:profile});
					}
					});
				} else {
					req.flash('warning', 'Profile not found: ' + keyword);
					res.redirect('/profiles');
				}
			});
		break;

		case 'organization':
		Profile.findByOrganization(keyword, req.user.id, (err, prf) => {
			if (err) {
				error(err);
				return;
			}

			if (null != prf && undefined != prf && 'undefined' != prf) {
				let profiles = [];
				for (var p in prf) {
					let objP = prf[p];
					let profile = {};

					profile.title = objP.title;
					profile.username = objP.username || '';
					profile.password = objP.password || '';
					profile.email = objP.email || '';
					profile.url = objP.url || '';
					profile.description = objP.description;
					profile.postDate = objP.postDate;
					profile.postTime = objP.postTime;
					profile.organization = objP.organization;
					profile.id = objP.id;

					User.findById(req.user.id, (err, user) => {
						if (err) {
							error(err);
							return;
						} else {
							profile.user = user.fname + ' ' + user.lname;
						}
					});
					profiles.push(profile);
				}

				// render results
				res.render('profiles/list', {title:cfc('profiles'), profiles:profiles});
			}
		});
		break;
	}
});

module.exports = router;

function log(data) {
	if (null != data && undefined != data && 'undefined' != data) {
		console.log(data);
	}
}

function error(data) {
	try {
		if (null != data && undefined != data && 'undefined' != data && '' != data) {
			if (data instanceof Array) {
				let objD = '';
				for (var d in data) {
					objD += chalk.white(d + ': ') + chalk.red(data[d]) + '\n';
				}
				log(objD);
			} else if (data instanceof Object) {
				let objE = '';
				for (var d in data) {
					objE = chalk.white(d + ': ') + chalk.red(data[d]) + '\n';
				}
				log(objE);
			} else {
				log(data);
			}
		}
	} catch (err) {
		let errMsg = '';
		for (var e in err) {}
			errMsg += chalk.white(e + ': ') + chalk.red(err[e]) + '\n';
		}
		log(errMsg);
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
