// Create a new 'render' controller method
exports.render = function(req, res) {
	// If the session's 'lastVisit' property is set, print it out in the console 
	if (req.session.lastVisit) {
		console.log(req.session.lastVisit);
	}

	// Set the session's 'lastVisit' property
	req.session.lastVisit = new Date();

	// Use the 'response' object to render the 'index' view with a 'title' property
	res.render('index', {
		title: 'OnClickCleaner'
	});
};

exports.renderAddUser = function (req, res) {
    
    // Use the 'response' object to render the 'add_user' view with a 'title' property
    res.render('register_customer', {
        title: 'Add User'
    });
    //you may also render an html form
    //res.render('add_user.html');
};