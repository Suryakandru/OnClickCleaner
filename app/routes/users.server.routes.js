var users = require('../../app/controllers/users.server.controller'),
    passport = require('passport');
module.exports = function (app) {
    app.route('/signup')
        .get(users.renderSignup)
        .post(users.signup);
    app.route('/signin')
        .get(users.renderSignin)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/',
            failureFlash: true
        }));
    app.get('/signout', users.signout);
    app.route('/editProfile/:_id').get(users.read).put(users.update);
    app.route('/userProfile/:_id').get(users.readProfile);
    app.route('/admin/allUsers').get(users.AllUsers);
    app.route('/admin/deleteUser/:_id').delete(users.deleteByUserId);
    app.param('_id', users.findUserById);
};
