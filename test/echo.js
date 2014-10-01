
'use strict';

var assert = require('assert');

var Transports = require('hudson-taylor/lib/transports');
var Client     = require('hudson-taylor/lib/client');
var Service    = require('hudson-taylor/lib/service');

var echo = require('../services/echo');

describe('Echo Service', function() {

    var transport, service, client;

    before(function() {

        // Create a new local transport to test with
        transport = new Transports.Local();

        // Create a new client, we don't need to call connect
        // because we're using a local transport
        client = new Client({
            echoService: transport
        });

    });

    it('should load echo service properly', function() {
        service = echo(transport);
        assert.equal(service instanceof Service, true);
    });

    it('should echo text back when "echo" is called', function(done) {

        var number = Math.floor(Math.random() * 10000).toString();

        client.call('echoService', 'echo', {
            message: number
        }, function(err, response) {

            assert.ifError(err);
            assert.equal(response.message, number);
            done();

        });

    });

    it('should trigger an error when sending "error"', function(done) {

        client.call('echoService', 'echo', {
            message: 'error'
        }, function(err, response) {

            assert.ifError(err);

            assert.equal(response.error, 'ERR_MSG');
            done();

        });

    });

});