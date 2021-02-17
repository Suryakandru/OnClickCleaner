/* 
Filename:       users.js
Student’s Name: Jiyuan Huang 
StudentID:      301083362
Date:           OCT 16,2020

This for login user database setting.
*/
let mongoose = require('mongoose');
let Schema = mongoose.Schema; // alias
let Model = mongoose.model; // alias

let userSchema = new Schema({
    username:String,
    password: String,
    email: String,
    other: String
},
{
    collection: 'users'
});

module.exports.Model = Model('User', userSchema);