
'use strict';

var async = require('async');

var Transports = require('hudson-taylor/lib/transports');

var echoConfig = {
    host: '0.0.0.0',
    port: 8889
};

var mathConfig = {
    host: '0.0.0.0',
    port: 8890
};

var echoTransport = new Transports.TCP(echoConfig);
var mathTransport = new Transports.TCP(mathConfig);

var services = [
    require('./services/echo')(echoTransport, echoConfig),
    require('./services/math')(mathTransport, mathConfig)
];

async.each(services, function(service, done) {
    service.listen(done);
}, function(err) {

    if(err) {
        console.log('There was an error listening:', err);
        process.exit(1);
    }

    console.log('Started all services..');

});