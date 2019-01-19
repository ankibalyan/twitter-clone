const express = require('express');
const { followUser } = require('../controllers/user')

const router = express.Router();

router.post('/follow', followUser);

module.exports = router;
