const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/findAguide', { useNewUrlParser: true ,useUnifiedTopology: true});
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const bcrypt = require('bcryptjs');
const usersModel = require('./v0/models/user.js');
const UserService = require('./v0/services/userService');
const TourService = require('./v0/services/tourService');
const ExperienceService = require('./v0/services/experienceService');
const ConversationService = require('./v0/services/conversationService');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//#region Users
//////////////////////////////////////USERS//////////////////////////////////////////////

//CREAR USUARIO
app.post('/users/registerForm',   (req, res) => {
    const userService = new UserService();
    const myPlaintextPassword = req.body.password;
    var hash = bcrypt.hashSync(myPlaintextPassword,2);
      userService.createUser(req.body.name,req.body.lastName,req.body.birthDate, 
        req.body.email,req.body.picture, hash, req.body.type,req.body.guiderInfo).then(result => {
            res.send(result)
        }).catch(err => {
            res.status(500).send(err)
        });
});


//HACER LOGIN
app.post('/users/login',   (req, res) => {
    const userService = new UserService();
    const email = req.body.email;
    const password = req.body.password;  
      usersModel.findOne({
      'email': email
    }) 
    .then(result => {
        if (result === null){
          const err = new Error('Email y/o Password incorrecto/s');
          res.status(401).send({ message: err.message, ok: false })
        } else{
            userService.checkUserPassword(result._id,password).then(loginResult =>{
                res.send({ ok: loginResult })
            })
        }
          
      }).catch(err => {
        res.status(500).send(err)
      });  
    
  });

   //EDITAR USUARIO
   app.put('/users/:uid',   (req, res) => {
    const userService = new UserService();
    userService.editUser(req.body.name,req.body.lastName,req.body.birthDate,req.body.email,req.body.picture, req.body.password, req.body.type,req.body.guiderInfo,req.params.uid)
        .then(result => {
            res.send(result)
        }).catch(err => {
            res.status(500).send(err)
        });
});

//BORRAR USUARIO
app.delete('/users/:uid',  (req, res) => {
    const userService = new UserService();
    userService.deleteUser(req.params.uid)
        .then(result => {           
            res.send(result)
        }).catch(err => {
            res.status(500).send(err)
        });
});


//FILTERED BY LOCATION AND LANGUAGE
app.get('/guider/destinationll/:location/:language', (req,res) => {
    const userService = new UserService();
    userService.getGuiderListByLocationAndLanguage(req.params.location,req.params.language)
    .then(result=>{
        res.send(result)
    }).catch(err => {
        res.status(500).send("err")
    });
})
//FILTERED BY LOCATION
app.get('/guider/destinationloc/:location', (req,res) => {
    const userService = new UserService();
    userService.getGuiderListByLocation(req.params.location)
    .then(result=>{
        res.send(result)
    }).catch(err => {
        res.status(500).send("err")
    });
})
/*
//FILTERED BY LANGUAGE
app.get('/guider/destinationlan/:language', (req,res) => {
    const userService = new UserService();
    userService.getGuiderListByLanguage(req.params.language)
    .then(result=>{
        res.send(result)
    }).catch(err => {
        res.status(500).send("err")
    });
})
*/

//GET ALLGUIDERS
app.get('/users', (req,res) => {
    const userService = new UserService();
    userService.getAllGuiders()
    .then(result=>{
        res.send(result)
    }).catch(err => {
        console.log(err)
        res.status(500).send("err")
    });
})

//GET USER OR GUIDER BY EMAIL
app.get('/users/:email', (req,res) => {
    const userService = new UserService();
    userService.findUserByEmail(req.params.email)
    .then(result=>{
        res.send(result)
    }).catch(err => {
        console.log(err)
        res.status(500).send("err")
    });
 })

//GET GUIDER PROFILE
app.get('/users/:uid', (req,res) => {
    const userService = new UserService();
    userService.findGuiderProfile(req.params.uid)
    .then(result=>{
        res.send(result)
    }).catch(err => {
        console.log(err)
        res.status(500).send("err")
    });
})

//#endregion



///////////////////////////////////TOURS/////////////////////////////////////

//CREATE TOUR
app.post('/tours/:uid',   (req, res) => {
    const  tourService = new TourService();
     tourService.createTour(req.body.name,req.body.experiences, req.body.interest,req.body.guiderId)
        .then(result => {
            res.send(result)
        }).catch(err => {
            res.status(500).send(err)
        });
});

//GET TOUR
app.get('/tours/:gid',(req,res)=>{
    const  tourService = new TourService();
     tourService.getTours(req.params.gid)
    .then(result=>{
        res.send(result)
    }).catch(err => {
        console.log(err)
        res.status(500).send("err")
    });
})
  //EDITAR TOUR
  app.put('/tours/:tid',   (req, res) => {
    const tourService = new TourService();
    tourService.editTour(req.body.name,req.body.experiences,req.body.interest,req.params.tid)
        .then(result => {
            res.send(result)
        }).catch(err => {
            res.status(500).send(err)
        });
});

//DELETE TOURS

app.delete('/tours/:tid',  (req, res) => {
    const tourService = new TourService();
    tourService.deleteTour(req.params.tid)
        .then(result => {           
            res.send(result)
        }).catch(err => {
            res.status(500).send(err)
        });
});

////////////////////////////////////EXPERIENCES/////////////////////////////////////////////

//CREATE EXPERIENCE
app.post('/experiences/:gid', (req, res) => {
    const experienceService = new ExperienceService();
    experienceService.createExperience(req.body.name,req.body.description, req.body.duration,req.body.price,req.body.guiderId)
      .then(result => {
          res.send(result)
      }).catch(err => {
          res.status(500).send(err)
      });
});
//GET EXPERIENCE
app.get('/experiences/:gid',(req,res)=>{
    const experienceService = new ExperienceService();
    experienceService.getExperience(req.params.gid)
    .then(result=>{
        res.send(result)
    }).catch(err => {
        console.log(err)
        res.status(500).send("err")
    });
})

//////////////////////////////////////CONVERSATIONS//////////////////////////////////////////////////

//CREATE CONVERSATION
app.post('/conversations', (req, res) => {
    const conversationService = new ConversationService();
    conversationService.createConversation(req.body.userId,req.body.guiderId, req.body.messages)
      .then(result => {
          res.send(result)
      }).catch(err => {
          res.status(500).send(err)
      });
});
console.log("Server connected");
app.listen(3000)
