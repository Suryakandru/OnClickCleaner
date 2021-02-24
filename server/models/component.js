/* 
Filename:       component.js
Student’s Name: Jiyuan Huang 
StudentID:      301083362
Date:           OCT 16,2020

This for contact database setting.
*/
let mongoose = require('mongoose');
let Schema = mongoose.Schema; // alias
let Model = mongoose.model; // alias

let ComponentSchema = new Schema({
    name: String,
    phone: String,
    email: String
},
{
    collection: 'contacts'
});

module.exports.Model = Model('Component', ComponentSchema);