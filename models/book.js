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
        user: {
            type: String,
            default: 'Anonymous User',
        },
        comment: String,
    }], //array of comments' objects
    readers: [{
        type: String,
    }],
    likes: [{
        user: {
            type: String,
            default: 'Anonymous User',
        },
        like: Boolean,
    }],
    dislikes: [{
        user: {
            type: String,
            default: 'Anonymous User',
        },
        like: Boolean,
    }]}, { versionKey: false });

const Book = mongoose.model('book', BookSchema);

module.exports = Book;