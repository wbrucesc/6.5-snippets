const User = {
  login: function(req, res){
    res.render('user/login', {
      messages: res.locals.getMessages()
    });
  },
  signup: function(req, res){
    res.render('user/signup', {
      messages: res.locals.getMessages()
    });
  }
};

module.exports = User;
