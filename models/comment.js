const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        autopopulate: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true,
    },
    comment: String,
}, { versionKey: false });

CommentSchema.plugin(autopopulate);
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;