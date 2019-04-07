var mongoose = require('mongoose');


var DataSchema = new mongoose.Schema({
    name:String,
    username:String,
    date:String,
    status:Boolean,
    url:String
})

var Data =  module.exports = mongoose.model('Data', DataSchema);
Data.createIndexes();