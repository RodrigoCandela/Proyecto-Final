var mongoose = require('mongoose');
const {Schema} = mongoose;
const MessageSchema = new Schema({
    message : [String],
    status : String,
    date : Date
})
const ConversationSchema = new Schema({
    userId : mongoose.Types.ObjectId,
    guiderId : mongoose.Types.ObjectId,
    messages : MessageSchema
})


var conversation = mongoose.model('Conversation', ConversationSchema);
module.exports = conversation;