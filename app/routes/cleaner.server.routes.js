const cleaner = require('../../app/controllers/cleaner.server.controller');
const service = require('../../app/controllers/service.server.controller');

module.exports = function (app) {
    app.route('/acceptedBookings').get(cleaner.bookingsAcceptedByCleaner);
    app.route('/availableBookings/:_id').get(service.read).put(cleaner.update);
    app.route('/acceptedBookings/:_id').get(service.read).put(cleaner.complete);
    app.route('/availableBookings').get(cleaner.display);
    app.route('/allReviews').get(cleaner.allReviews);
    app.param('_id', service.findServiceById);
};