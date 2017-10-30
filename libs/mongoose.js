var mongoose = require('mongoose');

mongoose.connect(_config("db.url"), _config("db.options"));

mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + _config("db.url"));
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit();
    });
});
