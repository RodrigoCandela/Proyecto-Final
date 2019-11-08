var mongoose = require('mongoose');
const conversationModel = require('../models/conversation');

class ConversationService{
    constructor(){

    }
//CREATE CONVERSATION
async createConversation(userId,guiderId, messages) {
    return await conversationModel.create({
        userId,
        guiderId,        
        messages
    });
}
//GET CHAT LIST 
async getChatList(id) {
    return await conversationModel.find({"guiderId":mongoose.Types.ObjectId(id)},['name','picture','messages[messages.lenght-1]'])
}
}
module.exports = ConversationService;