var mongoose = require('mongoose');
const experienceModel = require('../models/experience');

class ExperienceService {

constructor(){

}

//CREATE EXPERIENCE
async createExperience(name,description,duration,price,guiderId) {
    return await experienceModel.create({
        name,
        description,        
        duration,
        price,
        guiderId
    });
}
//GET ALL EXPERIENCES
async getExperience(id){
    return await experienceModel.find({"guiderId":mongoose.Types.ObjectId(id)},'name')
}
}

module.exports = ExperienceService;