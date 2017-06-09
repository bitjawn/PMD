const express = require('express');
const router = express.Router();
const cfc = require('../modules/cfc');

// home view
router.get('/', (req, res) => {
	res.render('index', {title:cfc('home'), header:cfc('welcome - manage your profiles')});
});

// about view
router.get('/about', (req, res) => {
	res.render('about', {title:cfc('about'), header:cfc('who we are')});
});

// contact view
router.get('/contact', (req, res) => {
	res.render('contact', {title:cfc('contact'), header:cfc('how to contact us')});
});

module.exports = router;
