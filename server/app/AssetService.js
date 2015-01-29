/* global -Promise */
'use strict';

var Promise = require('bluebird');
var Asset = require('../domain/Asset');
var Account = require('../domain/Account');

// Singleton Pattern as suggested here:
// http://stackoverflow.com/questions/24283362/singleton-pattern-with-browserify-commonjs

module.exports = {

    // Sample call that returns a resolved promise
    doStuff: function() {
        return Promise.resolve();
    },

    // Creates a new asset and inserts it in the database.
    // Returns a promise which when fulfilled provides the inserted fund with its id populated.
    createAsset: function(assetData) {
        var asset = new Asset(assetData);
        return asset.save();
    },

    // Performs an insert or update of the asset.
    // Returns a promise which when fulfilled provides the inserted or updated asset.
    // In case of an insert the asset's id is populated.
    saveAsset: function(asset) {
        return asset.save();
    },

    // Returns a promise which when fulfilled provides all assets.
    getAssets: function() {
        return Asset.fetchAll();
    },

    // Returns a promise which when fulfilled provides the asset associated with the given id.
    getAsset: function(id) {
        return new Asset({id: id}).fetch();
    },

    // Returns a promise which when fulfilled provides the account along with its assets.
    getAccount: function(investment) {
        return Asset.fetchAll()
            .then(function (assets) {
                var account = new Account(investment, assets);
                account.calculateSummary();
                return account;
            });
    }
};