const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username:String,
    password:String
})


var User = module.exports = mongoose.model('User', UserSchema);
User.createIndexes();

User.getUserByUsername = (username, callback) =>{
    User.findOne({'username' : username},callback);
 }
