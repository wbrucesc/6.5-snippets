const Snippet = require('./snippets');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

describe('Snippets Model test', function(){
  test('should create a new snippet and verify language of new snippet', async function(){
    var snippet = new Snippet({
      username: 'will@example.com',
      title: 'test snippet',
      body:'<h1> test </h1>',
      language: 'html',
      tags: ['html'],
      notes: 'test run'
    });

    console.log('AFTER SAVE!!!!');
    await snippet.save();
    expect(snippet.language).toBe(1);

  });
});
