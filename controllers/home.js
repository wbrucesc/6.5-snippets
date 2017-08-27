const User = require('../models/user');

const HomeController = {
  index: function(req, res) {
    // res.send('Working');
    console.log('user', req.user._id);
  User.find().then(function(snippetusers){
    res.render('index', {snippetusers: snippetusers});
  });
  },
  form: function(req, res) {
    res.render('form');
    return;
  },
  add: function(req, res) {
    const title = req.body.title;
    const body = req.body.body;
    const notes = req.body.notes;
    const language = req.body.language;
    const tags = req.body.tags;
    const userId = req.user._id;
    // const newUser = new User({
    //   title: title,
    //   body: body,
    //   notes: notes,
    //   language: language,
    //   tags: [String]
    // });
    User.findByIdAndUpdate(userId, {$set:
      {title: title,
       body: body,
       notes: notes,
       language: language,
       tags: tags}
    }).then(function(){
      res.redirect('/');
    });
    // newUser.save(function() {
    //   res.redirect('/');
    // });

  }
};

module.exports = HomeController;
