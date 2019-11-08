var mongoose = require('mongoose');
const {Schema} = mongoose;

const BudgetSchema = new Schema({
    userId : mongoose.Types.ObjectId,
    guiderId : mongoose.Types.ObjectId,
    tourID : mongoose.Types.ObjectId,
    experienceId : mongoose.Types.ObjectId,
    createDate : Date,
    tourDateStart: Date,
    tourDateEnd: Date
})
var budget = mongoose.model('Budget', BudgetSchema);
module.exports = budget;