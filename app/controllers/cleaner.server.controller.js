const session = require('express-session');
exports.render = function (req, res) {
	res.render('cleanerProfile', {
		title: 'Cleaner Profile',
	});
};