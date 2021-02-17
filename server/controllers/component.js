/* 
Filename:       component.js
Student’s Name: Jiyuan Huang 
StudentID:      301083362
Date:           OCT 16,2020

This for contact control.
*/

let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');

let Component = require('../models/component');

module.exports.DisplayComponentList = (req, res, next) => {
    //console.log(req.session.username);
    if(req.session.username){  
        //res.render('home',{username : req.session.userName});
        
        Component.Model.find( (err, data) => {
            if(err)
            {
              console.error(err);
              res.end()
            }
        
            res.render('component', { title: 'Contact List', components: data });
          });
    }else{
        res.redirect('/login');
    }
    
    
  }

module.exports.DisplayAddPage = (req, res, next)=> {
    res.render('component', { title: 'Add Contact' });
}

module.exports.ProcessAddPage = (req, res, next)=> {

    // instantiate a new object of type Component
    let component = Component.Model({
        "name": req.body.cname,
        "phone": req.body.cnumber,
        "email": req.body.cemail
    });

    Component.Model.create(component, (err, Component) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        res.redirect('/component-list');
    });
}

module.exports.DisplayEditPage = (req, res, next)=> {
    let id = req.params.id;

    // pass id to the db 
    Component.Model.findById(id, (err, ComponentToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        // show the edit view
        res.render('component', { title: 'Update Contact', data: ComponentToEdit });
    });
}

module.exports.ProcessEditPage = (req, res, next)=> {
    let id = req.params.id;

     // instantiate a new object of type Component
     let updatedComponent = Component.Model({
        "_id": id, 
        "name": req.body.cname,
        "phone": req.body.cnumber,
        "email": req.body.cemail
    });

    Component.Model.updateOne({_id: id}, updatedComponent, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        res.redirect('/component-list');
    });
}

module.exports.ProcessDeletePage = (req, res, next)=> {
    let id = req.params.id;

    Component.Model.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        res.redirect('/component-list');
    });
}