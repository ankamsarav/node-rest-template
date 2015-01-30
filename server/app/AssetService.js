/* global -Promise */
'use strict';

var Promise = require('bluebird');
var Asset = require('../domain/Asset');
var Account = require('../domain/Account');

// Sample call that returns a resolved promise
// function doStuff() {
//     return Promise.resolve();
// }

// Creates a new asset and inserts it in the database.
// Returns a promise which when fulfilled provides the inserted fund with its id populated.
function createAsset(assetData) {
    var asset = new Asset(assetData);
    return asset.save();
}

// Performs an insert or update of the asset.
// Returns a promise which when fulfilled provides the inserted or updated asset.
// In case of an insert the asset's id is populated.
function saveAsset(asset) {
    return asset.save();
}

// Returns a promise which when fulfilled provides all assets.
function getAssets() {
    return Asset.fetchAll();
}

// Returns a promise which when fulfilled provides the asset associated with the given id.
function getAsset(id) {
    return new Asset({id: id}).fetch();
}

// Returns a promise which when fulfilled provides the account along with its assets.
function getAccount(investment) {
    return getAssets()
        .then(function (assets) {
            var account = new Account(investment, assets);
            account.calculateSummary();
            return account;
        });
}


module.exports = {
    createAsset: createAsset,
    saveAsset: saveAsset,
    getAssets: getAssets,
    getAsset: getAsset,
    getAccount: getAccount
};