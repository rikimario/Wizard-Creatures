const User = require('../model/User');
const bcrypt = require('bcrypt');

// 13. Generate jwt
const jwt = require('../lib/jwt');
const { SECRET } = require('../constants');

exports.register = (userData) => User.create(userData);


exports.login = async (email, password) => {

  // 12. Login - find user by email
  const user = await User.findOne({ email });

  // validate user
  if (!user) {
    throw new Error('Invalid email or password!');
  }

  // validate password
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error('Invalid email or password!');
  }
  const payload = { _id: user._id, email: user.email }
  const token = await jwt.sign(payload, SECRET, { expiresIn: '3d' })


  return token;
};