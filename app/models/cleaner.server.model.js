// Load the Mongoose module and Schema object
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//define a new CommentSchema
const CleanerSchema = new Schema({
    //
    name: String,
    address: String,
    dateOfBirth: String,
    certification: String
});
//
mongoose.model('Cleaner', CleanerSchema);