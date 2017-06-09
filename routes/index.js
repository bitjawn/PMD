const express = require('express');
const router = express.Router();

// home view
router.get('/', (req, res) => {
	res.send('home');
});

module.exports = router;
