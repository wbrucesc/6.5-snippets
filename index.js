const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  session = require('express-session'),
  flash = require('express-flash-messages');

const router = require('./routes');
const User = require('./models/user');
const Snippet = require('./models/snippets');

const app = express();

const database = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
mongoose.connect(database);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/static', express.static('public'));

//Passport user auth config

passport.use('local-login', new LocalStrategy(
    function(username, password, done) {
        User.authenticate(username, password, function(err, user) {
            if (err) {
                return done(err);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false, {
                    message: "There is no user with that username and password."
                });
            }
        });
    }));

passport.use('local-signup', new LocalStrategy(
  function(username, password, done){
    console.log('local signup is running');
    User.signup(username, password, function(err, user){
      if (err) {
          return done(err);
      }
      if (user) {
          return done(null, user);
      } else {
          return done(null, false, {
              message: "There is already a user with that username."
          });
      }
    });
  }
));

passport.serializeUser(function(user, done) {   //tells passport how to track specific user
    done(null, user.id);                        //with unique id
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

//Middleware

app.use(bodyParser.urlencoded({extended: true}));


app.use(session({
    secret: 'snippets for days',   //salt used to generate tokens
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



router(app);

app.listen(process.env.PORT || 3000, () => {
  console.log("Application is running on port 3000");
});

module.exports = app;
