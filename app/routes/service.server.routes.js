const service = require('../../app/controllers/service.server.controller');

module.exports = function (app) {
    // app.route('/bookService')
    // .get(service.bookService);
    // app.post('/thanks', service.completeBookingService);

    app.param('userId', service.completeBookingService);
    app.route('/thanks').get(service.completeBookingService);

    app.route('/bookService').get(service.customerByUserName);
    app.post('/thanks', service.completeBookingService);
    app.route('/allBookings').get(service.bookingsByCustomer);
    app.route('/delete').delete(service.deleteByUserName);
};