const express = require('express');
const router = express.Router();

// all
router.get('/', (req, res) => {
	res.send('all profiles');
});

module.exports = router;
