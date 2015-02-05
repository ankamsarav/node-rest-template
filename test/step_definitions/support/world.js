/* jshint expr: true */
/* global -Promise */
'use strict';

var _ = require('underscore');
var Promise = require('bluebird');
var expect = require('./chai-helpers').expect;
var domain = require(process.cwd() + '/server/domain');
var Asset = domain.Asset;
var AssetService = require(process.cwd() + '/server/app/AssetService');

var World = function World(callback) {

    this.account = undefined;
    this.investment = undefined;
    this.error = undefined;

    this.createAssets = function(assetDataTable, callback) {
        var tasks = [];
        _.each(assetDataTable, function(assetData) {
            var asset = new Asset(assetData);
            tasks.push(AssetService.saveAsset(asset));
        });

        Promise.all(tasks)
            .then(function() {
                callback();
            });
    };

    this.setInvestment = function(investment) {
        this.investment = investment;
    };

    this.getAccount = function(callback) {
        var self = this;
        AssetService.getAccount(this.investment)
            .then(function (account) {
                self.account = account;
                callback();
            });
    };

    // ----- Asserts -----
    this.assertAccountSummary = function(expectedAccountSummary) {
        expect(this.account.market_value).to.almost.equal(parseFloat(expectedAccountSummary.market_value), 0);
        expect(this.account.earnings).to.almost.equal(parseFloat(expectedAccountSummary.earnings), 0);
        expect(this.account.cash).to.almost.equal(parseFloat(expectedAccountSummary.cash), 0);
    };

    callback();
};

module.exports.World = World;