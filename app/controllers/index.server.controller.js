const session = require('express-session');
exports.render = function (req, res) {
	res.render('index', {
		title: 'Home',
		userCategory: req.user? req.user.category : '',
		userFullName: req.user ? req.user.fullName : '',
		username: req.user? req.user.username : '',
	});
	session.userName = req.user.username;
	console.log('Session User Name: '+session.userName);
};
