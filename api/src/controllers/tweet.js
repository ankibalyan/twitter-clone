const TweetHelper = require('../dao/tweet');

async function createTweet(req, res, next) {
  const { text } = req.body;
  const { user } = res.locals;
  let data;

  const tweet = await TweetHelper.createTweet({ text, by: user.id });

  if (!tweet || !tweet._id) {
    res.status(400);
    return res.send({
      status: 0,
      msg: 'Unable to proceed, Please try after sometime',
      data
    });
  }

  return res.send({
    status: 1,
    msg: 'Sent Successfully',
    data: tweet
  });
}

async function myTweets(req, res, next) {
  const { user } = res.locals;
  let data;
  const tweets = await TweetHelper.findTweetsById(user.id);

  return res.send({
    status: 1,
    msg: 'fetched Successfully',
    data: tweets
  });
}

async function timelineTweets(req, res, next) {
  const { user } = res.locals;
  let data;
  const tweets = await TweetHelper.findTimelineTweets(user.id);

  return res.send({
    status: 1,
    msg: 'fetched Successfully',
    data: tweets
  });
}

module.exports = {
  createTweet,
  myTweets,
  timelineTweets,
};
