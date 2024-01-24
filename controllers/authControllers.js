const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { catchAsync } = require('../utilities');
const { User } = require('../models/users');
const { httpError } = require('../utilities');
const { SECRET_WORD } = process.env;

exports.signup = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if (user) throw httpError(409, 'Email in use');
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ ...req.body, password: hashPassword });
    res.status(201).json({
      user: { email: newUser.email, subscription: newUser.subscription },
    });
});

exports.login = catchAsync(async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if (!user) throw httpError(401, 'Email or password is wrong');
  const comparedPassword = await bcrypt.compare(password, user.password);
  if(!comparedPassword) throw httpError(401, 'Email or password is wrong');

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_WORD, { expiresIn: "24h" } );

  await User.findByIdAndUpdate(user.id, { token });

  res.status(200).json({
    token: token,
    user: { email: user.email, subscription: user.subscription },
  });
});


exports.getCurrent = catchAsync(async (req, res) => {
  const { email, subscription } = await req.user;

  res.json({ email, subscription });
});

exports.logout = catchAsync(async (req, res) => {
  const { _id } = await req.user;
  console.log('User ID:', _id);
  await User.findByIdAndUpdate(_id, {token: null});
  res.status(204).json();
});

exports.updateSubscription = catchAsync(async (req, res) => {
  const { _id } = await req.user;
  const { subscription } = await req.body;

  if (
    subscription !== "starter" &&
    subscription !== "pro" &&
    subscription !== "business"
  ) {
    throw httpError(400, "Invalid subscription");
  }

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {subscription},
    {new: true}
  );

  if (!updatedUser) {
    throw httpError(404, "Not found");
  }

  res.status(201).json('Subscription is updated!');
});