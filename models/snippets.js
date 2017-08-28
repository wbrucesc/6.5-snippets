const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    notes: {type: String},
    language: {type: String, required: true},
    tags: Array,
    username: String 
});

const Snippet = mongoose.model('Snippet', snippetSchema);

module.exports = Snippet;
