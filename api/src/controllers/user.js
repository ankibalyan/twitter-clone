const UserHelper = require('../dao/user');

async function followUser(req, res, next) {
  const { uname } = req.body;
  const { user } = res.locals;
  let data;

  // add followUser in own following list
  // add own id in followUser's followers list
  const followUser = await UserHelper.addFollower(user.id, uname);

  if (!followUser) {
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
    data: followUser
  });
}

module.exports = {
  followUser
};
