'use strict';

var _ = require('underscore');

var Account = function(investment, assets) {

    this.investment = investment;
    this.assets = assets.toJSON();
};

Account.prototype.calculateSummary = function() {

    var market_value = 0;
    var cash = 0;
    _.each(this.assets, function(asset) {
        market_value += asset.market_value;
        if (asset.asset_class === 'Cash') {
            cash = asset.market_value;
        }
    });

    this.market_value = market_value;
    this.earnings = market_value - this.investment;
    this.cash = cash;
};

module.exports = Account;