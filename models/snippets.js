const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema({
    title: {type: String, trim: true, required: true},
    body: {type: String, required: true},
    notes: {type: String},
    language: {type: String, trim: true, lowercase: true, required: true},
    tags:  [{type: String, trim: true, lowercase: true}],
    username: String
});

const Snippet = mongoose.model('Snippet', snippetSchema);

module.exports = Snippet;
