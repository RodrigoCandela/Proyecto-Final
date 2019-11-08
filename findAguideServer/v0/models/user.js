var mongoose = require('mongoose');
const {Schema} = mongoose;
const GuiderInfoSchema = new Schema({
    description:String,
    location : String,
    languages : [String],
    busyDates : Array,
    rating : Number,
    acreditation : Array
})
const UserSchema = new Schema({
    name : String,
    lastName : String,
    birthDate : Date,
    email : String,
    mainTopics:String,
    tours:String,
    picture : String,
    password : String,      
    type : Array,
    rating: Number,
    guiderInfo : GuiderInfoSchema
})

var userModel = mongoose.model('User', UserSchema);
module.exports = userModel;

