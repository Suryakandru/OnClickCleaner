// Load the Mongoose module and Schema object
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//define a new CommentSchema
const CleanerSchema = new Schema({
    //
    firstName: String,
    lastName: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    province: String,
    postalCode: String,
    dateOfBirth: String,
    certification: String,
    experience: String,
    totalJobs: Number,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service'
    }
});
//
mongoose.model('Cleaner', CleanerSchema);