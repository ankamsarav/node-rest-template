'use strict';

var domain = require('../domain');
var Asset = domain.Asset;
var Account = domain.Account;

// Performs an insert or update of the asset.
// Returns a promise which when fulfilled provides the inserted or updated asset.
// For an insert, do not define the id, it will be automatically populated.
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
    saveAsset: saveAsset,
    getAssets: getAssets,
    getAsset: getAsset,
    getAccount: getAccount
};