const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
var User = require('../model/user');
var Data = require('../model/Data');



var profile = null;
var error = null;

router.get('/' ,(req,res) =>{
    res.render('index',{error})
})

router.post('/',(req,res) => {
  var username = req.body.username;
  var password = req.body.password;
  User.getUserByUsername(username,(err,user) => {
    if(user) {
        bcrypt.compare(password, user.password, function(err, resp) {
            if (resp === true) {
               profile = user;
                res.redirect('/dashboard')
            } else {
                error = "Password not recognized"
                res.render('index',{error})
            }
        });
    } else {
        error = "Invalid User"
        res.render('index',{error})
    }
})
})


router.get('/dashboard' ,(req,res) => {
    if(profile) {
        Data.find({},(err,docs) =>{
            if(err)
            throw new Error;
            else 
            res.render('components/dashboard',{docs});
        })
    } else {
          error = "Login to continue";
          res.redirect('/');
    }
   
})

router.post('/dashboard' , (req,res) => {
    var name = req.body.name;
    var username = req.body.username;
    var date = req.body.date;
    var url = req.body.url;
    var dateArr = date.split('-');
     date = new Date(dateArr[0], dateArr[1]-1 , dateArr[2]);
    date = date.toDateString();
    var status = req.body.status;
    if (status === "true" || status === "false" || status == "True" || status == "False")  {
        var data = new Data();
        data.name = name;
        data.username = username ;
        data.url =url;
        data.status = (status == "true" || status == "True");
        data.date = date;
        data.save(); 
    }
      else {
        error = "Status must be boolean";
        console.log(error);
      }
    res.redirect('/dashboard');

})

router.get('/logout' ,(req,res) =>{
    profile = null;
    if(!profile) {
      error = null;
      res.redirect('/')
    }
    
})
module.exports = router;