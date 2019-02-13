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
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        autopopulate: true,
    }], //array of comments' objects
    readers: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: { select: 'username' },
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: { select: '_id' },
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: { select: 'username' },
    }]}, { versionKey: false });

BookSchema.plugin(autopopulate);
const Book = mongoose.model('Book', BookSchema);

module.exports = Book;