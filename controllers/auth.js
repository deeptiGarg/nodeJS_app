const User = require('../models/User');

// @desc        Register User
// @route       POST /api/v1/auth/register
// @access      public (no token needed, i.e. no authentication)
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await User.create({
      name: name,
      email: email,
      password,
      role
    });

    // Create Token and cookie
    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(400).json({ success: false, msg: err });
  }
};

// @desc        Login User
// @route       POST /api/v1/auth/login
// @access      public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: 'Please provide an email and password' });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      // Unauthorized user (Email does not exist)
      return res
        .status(401)
        .json({ success: false, msg: 'Invalid Credentials' });
    }

    // Check for Password
    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      // Invalid password
      return res
        .status(401)
        .json({ success: false, msg: 'Invalid Credentials' });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(400).json({ success: false, msg: err });
  }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create Token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token: token });
};
