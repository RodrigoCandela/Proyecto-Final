var mongoose = require('mongoose');
const toursModel = require('../models/tour');

class TourService{
    constructor(){

    }

//CREATE TOUR
async createTour(name,experiences,interest,guiderId) {
    return await toursModel.create({
        name,
        experiences,        
        interest,
        guiderId
    });
}
//EDIT TOUR
async   editTour(name,experiences,interest,_id) {  
    return await toursModel.updateOne({_id : _id},{
        name,
        experiences,
        interest
    });
}
//GET ALL TOURS 
async getTours(id){
    return await toursModel.find({"guiderId":mongoose.Types.ObjectId(id)},'name')
}

//DELETE TOURS
async deleteTour(_id) {
    return await toursModel.deleteOne({ _id : _id });
}




}
module.exports = TourService;