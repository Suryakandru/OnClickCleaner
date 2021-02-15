// Load the 'index' controller
const index = require('../controllers/index.server.controller');

// Define the routes module' method
module.exports = function(app) {
    app.get('/', index.render);
    app.get('/register_customer', index.renderAddUser);
};