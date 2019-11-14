/* eslint-disable no-process-env */
const mongoose = require('mongoose');
const User = require('./models/user.js');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

new User({
  username: 'test',
  password: 'test',
}).save(() => mongoose.disconnect());
