const session = require('express-session');
exports.render = function (req, res) {
	res.render('index', {
		title: 'Home',
		userCategory: req.user? req.user.category : '',
		userFullName: req.user ? req.user.fullName : '',
		username: req.user? req.user.username : '',
		userId: req.user? req.user._id : ''
	});
	session.userName = req.user.username;
	session.userFullName = req.user.fullName;
	console.log('Session User Full Name: '+session.userFullName);
};
