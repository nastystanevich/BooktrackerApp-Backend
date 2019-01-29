const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: String,
    author: String,
    cover: String, 
    published: Date,
    description: String, 
});

const Book = mongoose.model('book', BookSchema);

module.exports = Book;