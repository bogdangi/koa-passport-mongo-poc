const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy

const User = require('./models/user.js');

passport.serializeUser((user, done) => {
  done(null, user._id)
});

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username })
    .then(user => {
      if (!user || !user.validPassword(password)) {
        done(null, false, { message: "Invalid username/password" });
      } else {
        done(null, user);
      }
    })
  .catch(error => done(error));
}));
