
'use strict';

var Service = require('hudson-taylor/lib/service');
var Schema  = require('ht-schema');

module.exports = function(transport, config) {

    var mathService = new Service(transport, config);

    mathService.on('add', {
        one: Schema.Number(),
        two: Schema.Number()
    }, function(request, callback) {
        
        var result = request.one + request.two;

        callback(null, result);

    });

    mathService.on('subtract', {
        one: Schema.Number(),
        two: Schema.Number()
    }, function(request, callback) {
        
        var result = request.one - request.two;

        callback(null, result);

    });

    return mathService;

};