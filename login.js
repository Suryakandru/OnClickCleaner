/* 
Filename:       login.js
Student’s Name: Jiyuan Huang 
StudentID:      301083362
Date:           OCT 16,2020
This for login control.
*/
let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');

let User = require('../models/users');


module.exports.Login = (req, res, next)=> {
    res.render('login', { title: 'Login' });
}

module.exports.ProcessLogin = (req, res, next)=> {
    console.log("Check login");   
    let user = {
        username: req.body.username,
        password: req.body.password        
    };
     
      //console.log(user);   
    User.Model.find(user, (err, docs) => {

         if (docs.length) {
            console.log(docs.length);   
                 //session 
            req.session.username = user.username;
            console.log(req.session.username);   
             res.redirect('/component-list');

           } else {
               res.redirect('/login');
          }
  
        });

    
}
