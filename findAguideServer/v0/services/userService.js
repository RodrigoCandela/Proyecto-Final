var mongoose = require('mongoose');
const usersModel = require('../models/user');
const bcrypt = require('bcryptjs');

class UserService {
constructor(){

}

    async createUser(name,lastName,birthDate, email, picture, password, type, guiderInfo) {
    return await usersModel.create({
        name,
        lastName,
        birthDate,        
        email,
        picture,
        password,
        type,
        guiderInfo
    });
}




//CHECK USERPASSWORD
async   checkUserPassword(id,password){
    var user = await usersModel.findById(id);
    if(!password){
        return false;
    }else{
        const res = await bcrypt.compare(password,user.password)
        console.log(res)
        return res
    }
}
async   editUser(name,lastName,birthDate, email, picture, password, type, guiderInfo,_id) {  
    return await usersModel.findOneAndUpdate({_id : _id},{
        name,
        lastName,
        birthDate,
        email,
        picture,
        password,
        type,
        guiderInfo
    });
}
async deleteUser(_id) {
    return await usersModel.deleteOne({ _id : _id });
}
async findUser(_id) {
    return await usersModel.findById({
        _id:mongoose.Types.ObjectId('')
    });
}

//USER GET GUIDER LIST FILTERED

async getAllGuiders(){
    return await usersModel.find({"type":{"$in" : ["Guider"]}})
}

async   getGuiderListByLocationAndLanguage(location,language){   
    return await usersModel.find({"guiderInfo.location":location,'guiderInfo.languages': { "$in" : [language]} });
}
async   getGuiderListByLocation(location){   
    return await usersModel.find({"guiderInfo.location":location});
}
async   getGuiderListByLanguage(language){   
    return await usersModel.find({'guiderInfo.languages': { "$in" : [language]}});
}
async findUserByEmail(email) {
    return await usersModel.find({
        "email":email
    });
 }
//GET GUIDER PROFILE FOR USER
async   findGuiderProfile(id) {
    return await usersModel.findById({
        _id:mongoose.Types.ObjectId(id)       
    },['name','picture']);
}
}
module.exports = UserService;