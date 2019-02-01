const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: String,
    author: String,
    cover: String,
    published: Number,
    description: {
        type: String,
        default: 'no description',
    },
    comments: [{
        user: Object,
        comment: String,
    }], //array of comments' objects
    likes: [{
        user: Object,
        like: Boolean,
    }]}, { versionKey: false });

const Book = mongoose.model('book', BookSchema);

module.exports = Book;