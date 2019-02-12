const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
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
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        comment: String,
    }], //array of comments' objects
    readers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: { select: 'username' },
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: { select: 'username' },
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: { select: 'username' },
    }]}, { versionKey: false });

BookSchema.plugin(autopopulate);
const Book = mongoose.model('Book', BookSchema);

module.exports = Book;