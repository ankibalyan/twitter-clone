const express = require('express');
const { createTweet, myTweets, timelineTweets } = require('../controllers/tweet')

const router = express.Router();

router.post('/send', createTweet);
router.get('/sent', myTweets);
router.get('/', timelineTweets);

module.exports = router;
