// Load the module dependencies
const User = require('mongoose').model('User');
const passport = require('passport');
const session = require('express-session');

// Create a new error handling controller method
const getErrorMessage = function(err) {
	// Define the error message variable
	var message = '';

	// If an internal MongoDB error occurs get the error message
	if (err.code) {
		switch (err.code) {
			// If a unique index error occurs set the message error
			case 11000:
			case 11001:
				message = 'Username already exists';
				break;
			// If a general error occurs set the message error
			default:
				message = 'Something went wrong';
		}
	} else {
		// Grab the first error message from a list of possible errors
		for (const errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	// Return the message error
	return message;
};

// Create a new controller method that renders the signin page
exports.renderSignin = function(req, res, next) {
	// If user is not connected render the signin page, otherwise redirect the user back to the main application page
	if (!req.user) {
		// Use the 'response' object to render the signin page
		res.render('signin', {
			// Set the page title variable
			title: 'Sign-in Form',
			// Set the flash message variable
			messages: req.flash('error') || req.flash('info')
		});
	} else {
		return res.redirect('/');
	}
};

// Create a new controller method that renders the signup page
exports.renderSignup = function(req, res, next) {
	// If user is not connected render the signup page, otherwise redirect the user back to the main application page
	if (!req.user) {
		// Use the 'response' object to render the signup page
		res.render('signup', {
			// Set the page title variable
			title: 'Sign-up Form',
			// read the message from flash variable
			badmessage: req.flash('error') //passes the error stored in flash
		});
	} else {
		return res.redirect('/');
	}
};

// Create a new controller method that creates new 'regular' users
exports.signup = function(req, res, next) {
	// If user is not connected, create and login a new user, otherwise redirect the user back to the main application page
	if (!req.user) {
		// Create a new 'User' model instance
        const user = new User(req.body);
        console.log(req.body)
		const message = null;

		// Set the user provider property
		user.provider = 'local';

		// Try saving the new user document
		user.save((err) => {
			// If an error occurs, use flash messages to report the error
			if (err) {
				// Use the error handling method to get the error message
				const message = getErrorMessage(err);
                console.log(err)
				// save the error in flash
				req.flash('error', message); //save the error into flash memory

				// Redirect the user back to the signup page
				return res.redirect('/signup');
			}

			// If the user was created successfully use the Passport 'login' method to login
			req.login(user, (err) => {
				// If a login error occurs move to the next middleware
				if (err) return next(err);

				// Redirect the user back to the main application page
				return res.redirect('/');
			});
		});
	} else {
		return res.redirect('/');
	}
};

// Create a new controller method that creates new 'OAuth' users
exports.saveOAuthUserProfile = function(req, profile, done) {
	// Try finding a user document that was registered using the current OAuth provider
	User.findOne({
		provider: profile.provider,
		providerId: profile.providerId
	}, (err, user) => {
		// If an error occurs continue to the next middleware
		if (err) {
			return done(err);
		} else {
			// If a user could not be found, create a new user, otherwise, continue to the next middleware
			if (!user) {
				// Set a possible base username
				const possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');

				// Find a unique available username
				User.findUniqueUsername(possibleUsername, null, (availableUsername) => {
					// Set the available user name 
					profile.username = availableUsername;
					
					// Create the user
					user = new User(profile);

					// Try saving the new user document
					user.save(function(err) {
						// Continue to the next middleware
						return done(err, user);
					});
				});
			} else {
				// Continue to the next middleware
				return done(err, user);
			}
		}
	});
};

// Create a new controller method for signing out
exports.signout = function(req, res) {
	// Use the Passport 'logout' method to logout
	req.logout();

	// Redirect the user back to the main application page
	res.redirect('/');
};

exports.read = function(req, res) {
	//var updatedService = req.service;
	console.log('In-read'+ req.user);
	//res.json(req.user);
	var jsonUser = JSON.parse(JSON.stringify(req.user));
	console.log("In editProfile: "+ jsonUser);
	res.render('editProfile', { title: 'Edit Profile', user: jsonUser, badmessage: req.flash('error')} );
};

exports.readProfile = function(req, res) {
	//var updatedService = req.service;
	console.log('In-read'+ req.user);
	//res.json(req.user);
	var jsonUser = JSON.parse(JSON.stringify(req.user));
	res.render('userProfile', { title: 'User Profile', user: jsonUser} );
};

exports.findUserById = function (req, res, next, _id) {
	User.findOne({
		_id: _id 
	}, (err, user) => {
		if (err) {			
			return next(err);
		} else {
			//console.log(service)
			req.user = user;
			session.user = user;
			next();
		}
	});
};

exports.userByUserId = function (req, res, next){
	req.user = session.user;
		var jsonUser = JSON.parse(JSON.stringify(req.service));
		const message = getErrorMessage(err);
                console.log(err)
				// save the error in flash
				req.flash('error', message); //save the error into flash memory
		res.render('editProfile', { title: 'Edit Profile', user: jsonUser} );
		console.log("In editProfile");
};

exports.update = function (req, res, next) {
	console.log("New password1: "+ req.user.password);
	User.findByIdAndUpdate(req.user._id, req.body, function (err, user) {
		if (err) {
		  return next(err);
		} else {
		  user.password = req.body.password;
		  console.log("New password: "+ user.password);
		  user.save(function (err, user) {
			if (err) {
			  res.send("Error: ", err);
			} else {
				res.redirect('/')
			}
		  })
		}
	  });
};

//Display list of all users
exports.AllUsers = function (req, res, next) {
    User.find({}, (err, users) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            res.render('allUsers', {
                title: 'All users',
                users: users
            });
        }
    });
};

//Delete an user
exports.deleteByUserId = function (req, res, next) {
	console.log("User deletion initiated");
	User.findOneAndRemove({
		_id: session.user._id
	}, function (err, user) {

		if (err) throw err;    
	});   
	res.redirect('/admin/allUsers');         
};