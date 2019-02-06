const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    books: [{ // the array of books' id
        types: String,
    }],
});
UserSchema.methods.validPassword = (password) => {
    return this.password === password;
};
// UserSchema.methods.encryptPassword = (password) => {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
// };

// UserSchema.methods.validPassword = (password) => {
//     return bcrypt.compareSync(password, this.password);
// };

const User = mongoose.model('user', UserSchema);

module.exports = User;