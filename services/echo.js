
'use strict';

var Service = require('hudson-taylor/lib/service');
var Schema  = require('ht-schema');

module.exports = function(transport, config) {

    var echoService = new Service(transport, config);

    echoService.on('echo', {
        message: Schema.String()
    }, function(request, callback) {
        
        var msg = request.message;

        if(msg == 'error') {
            return callback(null, {
                error: 'ERR_MSG'
            });
        }

        callback(null, {
            message: msg
        });

    });

    return echoService;

};