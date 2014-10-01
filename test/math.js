
'use strict';

var assert = require('assert');

var Transports = require('hudson-taylor/lib/transports');
var Client     = require('hudson-taylor/lib/client');
var Service    = require('hudson-taylor/lib/service');

var math = require('../services/math');

describe('Math Service', function() {

    var transport, service, client;

    before(function() {

        // Create a new local transport to test with
        transport = new Transports.Local();

        // Create a new client, we don't need to call connect
        // because we're using a local transport
        client = new Client({
            mathService: transport
        });

    });

    it('should load math service properly', function() {
        service = math(transport);
        assert.equal(service instanceof Service, true);
    });

    describe('add', function() {

        it('should add two numbers together', function(done) {

            var one = Math.floor(Math.random() * 10000);
            var two = Math.floor(Math.random() * 10000);

            client.call('mathService', 'add', {
                one: one,
                two: two
            }, function(err, response) {

                assert.ifError(err);
                assert.equal(response, one + two);
                done();

            });

        });

    });

    describe('subtract', function() {

        it('should subtract two numbers', function(done) {

            var one = Math.floor(Math.random() * 10000);
            var two = Math.floor(Math.random() * 10000);

            client.call('mathService', 'subtract', {
                one: one,
                two: two
            }, function(err, response) {

                assert.ifError(err);
                assert.equal(response, one - two);
                done();

            });

        });

    });

});