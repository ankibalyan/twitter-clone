const Tweet = require('../models/Tweet');
const User = require('../models/User');

async function createTweet({ text, by }) {
  const validKeyData = { text, by };

  for (var key in validKeyData) {
    if (!validKeyData.hasOwnProperty(key) || !validKeyData[key]) {
      delete validKeyData[key]
    }
  }

  const newTweet = new Tweet(validKeyData);

  return await newTweet.save();
}

async function likeTweet({ id, likedById }) {
  return await Tweet.findOneAndUpdate({ _id: id }, { $addToSet: { likes: likedById } }, { new: true });
}

async function findTweetsById(id) {
  const tweets = await Tweet.find({ by: id }).sort({ ts: -1 }).populate('by', { uname: 1, name: 1, img: 1 });
  return tweets;
}

async function findTimelineTweets(id) {
  const users = await User.findOne({ _id: id }, { following: 1 }) || [];

  // include self tweets as well
  users.following.push(users._id);
  return await Tweet.find({ by: users.following }).populate('by', { uname: 1, name: 1, img: 1 }).sort({ ts: -1 });;
}


module.exports = {
  createTweet,
  likeTweet,
  findTweetsById,
  findTimelineTweets
};
