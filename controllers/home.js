const Snippet = require('../models/snippets');
const User = require('../models/user');

const HomeController = {
  index: function(req, res) {
    // res.send('Working');
  const username = req.user.username;

  Snippet.find({'username': username}).then(function(snippets){
    res.render('index', {snippets: snippets});
  });
},
  profile: function(req, res){
    const snippetId = req.params.id;

    Snippet.findOne({'_id': snippetId}).then(function(snippet){
        res.render('profile', snippet);
    });
  },

  form: function(req, res) {
    const snippetId = req.params.id;
    if(!snippetId){                     //if there is no snippetId then render blank add form
      res.render('form');
      return;
    }
    Snippet.findOne({'_id': snippetId}).then(function(snippet){
      res.render('form', snippet);                            //if there is a snippetId render edit page with snippet details
    });
  },
  add: function(req, res) {
    const title = req.body.title;
    const body = req.body.body;
    const notes = req.body.notes;
    const language = req.body.language;
    const tags = req.body.tags.trim();
    const tagArray = tags.split(',');
    const username = req.user.username;
    console.log(username);

    const newSnippet = new Snippet({
      title: title,
      language: language,
      body: body,
      notes: notes,
      tags: tagArray,
      username: username
    });

    newSnippet.save(function(){
      console.log('saving newSnippet', newSnippet);
      res.redirect('/');
    });
  },
  edit: function(req, res){
    const title = req.body.title;
    const body = decodeURI(req.body.body);
    const notes = req.body.notes;
    const language = req.body.language.trim().toLowerCase();
    const tags = req.body.tags.trim();
    const tagArray = tags.split();
    const username = req.user.username;

    const snippetId = req.params.id;

    Snippet.findByIdAndUpdate(snippetId, {$set: {
      title: title,
      language: language,
      body: body,
      notes: notes,
      tags: tagArray,
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
  },
  search: function(req, res){
    console.log('search is firing');

    const language = req.body.searchLang.toLowerCase();
    console.log(language);

    Snippet.find({'language': language}).then(function(snippets){
      res.render('index', {snippets: snippets});
    });
  }

};

module.exports = HomeController;
