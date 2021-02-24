/* 
Filename:       index.js
Student’s Name: Jiyuan Huang 
StudentID:      301083362
Date:           OCT 16,2020

This for index control.
*/
let express = require('express');
let router = express.Router();

module.exports.DisplayHomePage = (req, res, next) => {

    console.log("Home Page Controller");
    res.render('index', { 
    title: 'Home',
    S1:'I believe by knowing what I value, I truly know what I want.' ,    
    l1:'active',
    l2: '',
    l3: '',
    l4: '',
    l5: '',
    l6: ''  });
  }
  
module.exports.DisplayProductsPage = (req, res, next) => {
    res.render('index', { 
    title: 'Products', 
    S1:'',
    l1: '',
    l2: '',
    l3: 'active',
    l4: '',
    l5: '',
    l6: ''   });
  }

module.exports.DisplayServicesPage = (req, res, next) => {
   res.render('index', { 
    title: 'Services',
    S1:'',
    l1: '',
    l2: '',
    l3: '',
    l4: 'active',
    l5: '',
    l6: ''  });
  }

module.exports.DisplayAboutPage = (req, res, next) => {
    res.render('index', { 
    title: 'About',
    S1:'',
    l1: '',
    l2: 'active',
    l3: '',
    l4: '',
    l5: '',
    l6: ''  });
  }
  
module.exports.DisplayContactPage = (req, res, next) => {
    res.render('index', { 
    title: 'Contact',
    S1:'',
    l1: '',
    l2: '',
    l3: '',
    l4: '',
    l5: '',
    l6: 'active'  });
  }

