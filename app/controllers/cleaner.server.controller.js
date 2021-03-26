const Service = require('mongoose').model('Service');
const User = require('mongoose').model('User');
const session = require('express-session');

exports.display = function(req, res) {
    Service.find({status: 'Requested'}, function(err, bookings){
        if(err){
            return next(err);        
        }else{
            //console.log("Available bookings: "+bookings)
        }
    }).populate('customer').exec((err, customers)=>{
        //console.log(`Populated: `, customers)
        res.render(
            "availableBookings", {
                title: 'Available Bookings',
                customers: customers, 
        });
    })
  };

  exports.findServiceById = function (req, res, next, _id) {
    Service.findOne({
        _id: _id 
    }, (err, service) => {
        if (err) {
            
            return next(err);
        } else {
            //console.log(service)
            req.service = service;
            session.service = service;
            next();
        }
    });
};

  exports.serviceByServiceId = function (req, res, next){
    req.service = session.service;
        var jsonService = JSON.parse(JSON.stringify(req.service));
        res.render('acceptedBookings', { title: 'Accepted Bookings', booking: jsonService} );
};

exports.update = function (req, res, next) {
    var cleanername = session.userFullName;
    var username = session.userName;
    console.log(username);
    req.cleaner = User.findOne({ username: username }, (err, user) => {
        if (err) { return getErrorMessage(err); }
        req.id = user._id;
        userFullName = user.fullName;
        cleanername = userFullName;
        //console.log(req.id);
    });
    Service.findByIdAndUpdate(
        { _id: req.service._id },
        { status: "Accepted", cleaner:  cleanername, },
        function(err, result) {
          if (err) {
            res.send(err);
          } else {
            console.log("Update in action");
            //res.redirect('/acceptedBookings');
            console.log(req.service);
          }
        }
      );
      User.findByIdAndUpdate(
        { _id: req.service.customer._id },
        { notification: "Cleaning request accepted by "+ cleanername },
        function(err, result) {
          if (err) {
            res.send(err);
          } else {
            console.log("Update in action");
            res.redirect('/acceptedBookings');
          }
        }
      );
};

     //List of all bookings accepted by a cleaner
     exports.bookingsAcceptedByCleaner = function (req, res, next) {
        var userName = session.userName;
        console.log("Cleaner: " +userName);
        User.
            findOne({ cleaner: session.userFullName }, (err, user) => {
                if (err) { return getErrorMessage(err); }
                console.log(req.id);
            }).then(function () {
                Service.
                    find({
                        cleaner: session.userFullName
                    }, (err, bookings) => {
                        if (err) { return getErrorMessage(err); }
                    }).populate('customer').exec((err, bookings)=>{
                        //console.log(`Populated: `, customers)
                        res.render(
                            "acceptedBookings", {
                            title: 'Accepted Tasks',
                            userFullName: session.userFullName,
                            bookings: bookings
                        });
                    });
            });
    };

    exports.complete = function (req, res, next) {
        var cleanername = session.userFullName;
        var username = session.userName;
        console.log(username);
        Service.findByIdAndUpdate(
            { _id: req.service._id },
            { status: "Completed"},
            function(err, result) {
              if (err) {
                res.send(err);
              } else {
                console.log("Update in action");
                //res.redirect('/acceptedBookings');
                //console.log(req.service);
              }
            }
          );
          User.findByIdAndUpdate(
            { _id: req.service.customer._id },
            { notification: "Cleaning request completed by "+ cleanername },
            function(err, result) {
              if (err) {
                res.send(err);
              } else {
                console.log("Completion in action");
                res.redirect('/acceptedBookings');
              }
            }
          );
    };

    exports.allReviews = function (req, res, next) {
      console.log("In customer feedback page. session user fullname: " +session.userFullName);
      Service.find(
        {cleaner: session.userFullName, review:{$ne:null}},
        function(err, bookings){
        if(err){
            return next(err);        
        }else{
            //console.log("Available bookings: "+bookings)
        }
    }).populate('customer').exec((err, services)=>{
        //console.log(`Populated: `, customers)
        res.render(
            "allReviews", {
                title: 'Customer Feedbacks',
                services: services, 
        });
    })
  };
