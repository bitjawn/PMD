const express = require('express');
const router = express.Router();

// user login
router.get('/', (req, res) => {
	res.send('login');
});

module.exports = router;
