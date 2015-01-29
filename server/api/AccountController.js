'use strict';

var AssetService = require('../app/AssetService');

// Returns the account along with the assets
var getAccount = function (req, res) {
    var investment = 1000000; // hard coded value
    AssetService.getAccount(investment)
        .then(function (account) {
            res.send(account);
        })
        .catch(function (error) {
            console.log(error.stack);
            res.status(500).send({'message': error.toString()});
        });
};

exports.addRoutes = function (api) {
    api.get('/account', getAccount);
};