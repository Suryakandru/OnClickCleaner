const session = require('express-session');
var Customer = require('mongoose').model('User');
var Service = require('mongoose').model('Service');

//Render the service booking page
// exports.bookService = function (req, res) {   
//     // Use the 'response' object to show the delete_user page
//     res.render('bookService', {
//         title: 'Book a service' });       
// };

exports.customerByUserName = function (req, res, next) {
    req.user = req.body //read the user from request's body
    // Use the 'User' static 'findOne' method to retrieve a specific user
    var username = session.userName;
    console.log("Username: "+ username);
    Customer.findOne({
        username: username //finding a document by username
    }, (err, user) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Set the 'req.user' property
            req.user = user;
            session.userId = user._id;
            session.userFirstName = user.firstName;
            //parse it to a JSON object
            var jsonUser = JSON.parse(JSON.stringify(user));
            console.log(jsonUser);
            //display edit page and pass user properties to it
            res.render('bookService', { title: 'Book a service', user: jsonUser} );
            // Call the next middleware
            next();
        }
    });
};

exports.completeBookingService = function (req, res) {
    var username = session.userName;
     // Create a new instance of the 'Comment' Mongoose model
     //var comment = new Comment(req.body); //get data from ejs page and attaches them to the model
     var service = new Service({
        addressLine1: req.body.addressLine1,
        addressLine2: req.body.addressLine2,
        city: req.body.city,
        province: req.body.province,
        postalCode: req.body.postalCode,
        serviceType: req.body.serviceType,
        serviceDate: req.body.serviceDate,
        customer: session.userId });
        console.log("Customer id: "+ session.userId);
     service.save(function (err) {
        
         if (err) {
             // Call the next middleware with an error message
             return next(err);
         } else {
             // Use the 'response' object to send a JSON response
             res.render('thanks', {
                 title: 'Thank You',  
                 userFirstName : session.userFirstName,
                 address: req.body.addressLine1 + ", " + req.body.addressLine2
                 + ", " + req.body.city + ", " + req.body.province + ", " + req.body.postalCode,
                date: req.body.serviceDate,
                username : username,
                status: service.status                              
             });          
         }
     });
};

     //List of all bookings by a customer
     exports.bookingsByCustomer = function (req, res, next) {
        var username = session.userName;
        console.log(username);
        //find the student then its comments using Promise mechanism of Mongoose
        Customer.
            findOne({ username: username }, (err, user) => {
                if (err) { return getErrorMessage(err); }
                req.id = user._id;
                userFullName = user.fullName;
                console.log(req.id);
            }).then(function () {
                //find the posts from this author
                Service.
                    find({
                        customer: req.id
                    }, (err, bookings) => {
                        if (err) { return getErrorMessage(err); }
                        //res.json(comments);
                        res.render('allBookings', {
                            title: 'All Bookings',
                            userFullName: userFullName,
                            bookings: bookings
                        });
                        console.log("Booking details " + bookings);
                    });
            });
    };

    //delete user by username
exports.deleteByUserName = function (req, res, next) {
    console.log("Method called: " + req.body._id);
    User.findOneAndRemove({
        username: req.body._id
    }, function (err, user) {

        if (err) throw err;

        console.log("Success");

    });
    
    res.redirect('/allBooking');
};

// 'delete' controller method to delete a user
exports.delete = function(req, res, next) {
	// Use the 'User' instance's 'remove' method to delete user document
	req.service.remove((err) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Use the 'response' object to send a JSON response
			res.json(req.service);
		}
	})
};