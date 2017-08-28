const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, lowercase: true, required: true },
  passwordHash: { type: String, required: true },
  // properties: {
  //   title: [{type: String}],
  //   body: [{type: String}],
  //   notes: [{type: String}],
  //   language: [{type: String}],
  //   tags: Array
  // }
});

userSchema.virtual('password')
  .get(function () { return null; })  //added ; after null (was triggering linter error without)
  .set(function (value) {
    const hash = bcrypt.hashSync(value, 8);
    this.passwordHash = hash;
  });

userSchema.methods.authenticate = function (password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

userSchema.statics.authenticate = function(username, password, done) {
    this.findOne({
        username: username
    }, function(err, user) {
        if (err) {
            done(err, false);
        } else if (user && user.authenticate(password)) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
};

userSchema.statics.signup = function(username, password, done) {
    this.findOne({
        username: username
    }, function(err, user) {
        if (err) {
          done(err, false);

        } else if(user){
          done(null, false);

        } else {
          var newUser = new User({username: username, password: password});
          newUser.save(function(err, user){
            if (err) {
              done(err, false);
            }else{
              done(null, user);
            }
          });
        }
    });
};

const User = mongoose.model('SnippetUser', userSchema);

module.exports = User;
