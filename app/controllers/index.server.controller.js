// Create a new 'render' controller method
exports.render = function (req, res) {
	res.render('index', {
		title: 'Home',
		userCategory: req.user? req.user.category : '',
		userFullName: req.user ? req.user.fullName : ''
	});
	console.log("Category: "+userCategory);
};
