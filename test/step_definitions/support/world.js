/* jshint expr: true */
'use strict';

var expect = require('./chai-helpers').expect;
var domain = require(process.cwd() + '/server/domain');
var application = require(process.cwd() + '/server/application');
var Account = domain.Account;
var AccountService = application.AccountService;


var World = function World(callback) {
    // Cached objects
    this.account = undefined;

    // ----- Accounts -----
    this.createAccount = function(name, callback) {
        var self = this;

        AccountService.createAccount({name: name})
            .then(function(account) {
                self.account = account.toJSON();
                callback();
            });
    };

    this.changeAccountName = function(name, callback) {
        var self = this;

        self.account.name = name;

        AccountService.updateAccount(self.account)
            .then(function(account) {
                self.account = account.toJSON();
                callback();
            });
    };

    this.getAccount = function(callback) {
        var self = this;

        AccountService.getAccount(self.account.id)
            .then(function(account) {
                self.account = account.toJSON();
                callback();
            });
    };

    this.deleteAccount = function(callback) {

        AccountService.deleteAccount(this.account.id)
            .then(function() {
                callback();
            });
    };

    this.assertAccountName = function(expectedName) {
        expect(this.account.name).to.equal(expectedName);
    };

    this.assertAccountDoesNotExist = function(callback) {
        AccountService.getAccount(this.account.id)
            .then(function(account) {
                callback.fail(new Error('Account exists: ' + account.get('name')));
            })
            .catch(Account.NotFoundError, function() {
                // NotFoundError is expected
                callback();
            });
    };

    callback();
};

module.exports = {
    World: World
};
