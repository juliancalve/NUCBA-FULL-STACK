const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    email: String,
    password: String,
    age: Number,
    firstName: String,
    lastName: String,
    createdAt: { type: Date, default: new Date() },
    enabled: { type: Boolean, default: true },
    token: String,
    emailIsVerified: Boolean
});

const UserModel = model('Users', UserSchema);

module.exports = UserModel;