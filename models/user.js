const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    readBooks: [{ // the array of read books' id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        
    }],
    likedBooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    }],
    dislikedBooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    }],
}, { versionKey: false });

UserSchema.methods.validPassword = function (password) {
    return this.password === password;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;