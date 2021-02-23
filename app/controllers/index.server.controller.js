// Create a new 'render' controller method
exports.render = function (req, res) {
	res.render('index', {
		title: 'Hello World',
		userFullName: req.user ? req.user.fullName : ''
	});
};
