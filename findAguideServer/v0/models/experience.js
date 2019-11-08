var mongoose = require('mongoose');
const {Schema} = mongoose;

const ExperienceSchema = new Schema({
    name: String,
    description : String,
    duration : Number,
    price : Number,
    guiderId : mongoose.Types.ObjectId
})
var experience = mongoose.model('Experience', ExperienceSchema);
module.exports = experience;