const User = require('../models/User');

async function createUser({ uname, email, name, pwd, dob, gender, img }) {
  const userData = { uname, name, email, pwd, dob, gender, img };

  for (var key in userData) {
    if (!userData.hasOwnProperty(key) || !userData[key]) {
      delete userData[key]
    }
  }

  const newUser = new User(userData);

  return await newUser.save();
}

async function verifyUser({ uname, pwd }) {
  const user = await User.findOne({ $or: [{ uname }, { email: uname }] });
  if (!user || !user._id) {
    return false;
  }

  const isMatch = await user.comparePassword(pwd);
  return !isMatch || user;
}

async function findByHandle(uname, projection) {
  const user = await User.findOne({ uname });
  if (!user || !user._id) {
    return false;
  }

  return user;
}

module.exports = {
  createUser,
  verifyUser,
  findByHandle
};
