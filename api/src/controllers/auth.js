const UserHelper = require('../dao/user');
const { createAuthToken, verifyAuthToken } = require('../helper/auth');

async function registerWithPassword(req, res, next) {
  const { uname, email, name, pwd, dob, gender, img } = req.body;
  let data;

  const user = await UserHelper.createUser({ uname, email, name, pwd, dob, gender, img });

  if (!user || !user._id) {
    res.status(400);
    return res.send({
      status: 0,
      msg: 'Unable to proceed, Please try after sometime',
      data
    });
  }

  return res.send({
    status: 1,
    msg: 'Registered Successfully',
    data: user
  });
}

async function loginWithPassword(req, res, next) {
  const { uname, pwd } = req.body;
  let data = null;

  // fetch user and test password verification
  const user = await UserHelper.verifyUser({ uname, pwd });

  if (!user || !user.id) {
    res.status(401);
    return res.send({
      status: 0,
      msg: 'Invalid Credentials',
      data
    });
  }

  const createToken = createAuthToken({ id: user.id, uname: user.uname, email: user.email });

  data = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      dob: user.dob,
      img: user.img,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt
    },
    token: createToken
  }
  return res.send({
    status: 1,
    msg: 'Credentials verified',
    data
  });
}

async function authWithToken(req, res, next) {
  let payload;
  let data;

  payload = verifyAuthToken(req.headers.authorization);

  const usersProjection = {
    token: false,
    createdAt: false,
    updatedAt: false
  }

  const user = await UserHelper.findByHandle(payload.uname, usersProjection);

  if (!user || !user.id) {
    res.status(400);
    return res.send({
      status: 0,
      msg: 'Unable to proceed, Please try after sometime',
      data
    });
  }

  data = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      dob: user.dob,
      img: user.profileImg,
      followersCount: user.followers.length,
      followingCount: user.following.length,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt
    }
  };

  return res.send({
    status: 1,
    msg: 'Current user',
    data
  });
}

module.exports = {
  registerWithPassword,
  loginWithPassword,
  authWithToken,
};
