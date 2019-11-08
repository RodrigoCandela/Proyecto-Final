var mongoose = require('mongoose');
const {Schema} = mongoose;

const TourSchema = new Schema({
    name: String,
    experiences : [mongoose.Types.ObjectId],
    interest : [String],
    guiderId: mongoose.Types.ObjectId
})
var tour = mongoose.model('Tour', TourSchema);
module.exports = tour;