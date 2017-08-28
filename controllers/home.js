const Snippet = require('../models/snippets');
const User = require('../models/user');

const HomeController = {
  index: function(req, res) {
    // res.send('Working');
  const username = req.user.username;

  Snippet.find({'username': username}).then(function(snippets){
    res.render('index', {snippets: snippets});
  });
  // // const username = req.user.username;
  // // User.findOne({'username': username}).then(function(user){
  // //   res.render('index', {user: user});
  // //   return;
  // });
  },
  form: function(req, res) {
    const snippetId = req.params.id;
    if(!snippetId){
      res.render('form');
      return;
    }
    Snippet.findOne({'_id': snippetId}).then(function(snippet){
      res.render('form', snippet);
    });
  },
  add: function(req, res) {
    const title = req.body.title;
    const body = req.body.body;
    const notes = req.body.notes;
    const language = req.body.language;
    const tags = req.body.tags;
    const username = req.user.username;
    console.log(username);

    const newSnippet = new Snippet({
      title: title,
      language: language,
      body: body,
      notes: notes,
      tags: tags,
      username: username
    });

    newSnippet.save(function(){
      console.log('saving newSnippet', newSnippet);
      res.redirect('/');
    });
  },
  edit: function(req, res){
    const title = req.body.title;
    const body = req.body.body;
    const notes = req.body.notes;
    const language = req.body.language;
    const tags = req.body.tags;
    const username = req.user.username;

    const snippetId = req.params.id;

    Snippet.findByIdAndUpdate(snippetId, {$set: {
      title: title,
      language: language,
      body: body,
      notes: notes,
      tags: tags,
      username: username
    }}).then(function(){
      res.redirect('/');
    });

  },
  delete: function(req, res){
    const snippetId = req.params.id;
    Snippet.deleteOne({'_id': snippetId}).then(function(){
      res.redirect('/');
    });
  },
  out: function(req, res){
    req.session.destroy(function(){
      res.redirect('/login');
    });
  }

};

module.exports = HomeController;



//TODO add user to snippets schema
