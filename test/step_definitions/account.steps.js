'use strict';

module.exports = function() {

    this.World = require('./support/world').World;

    this.Given(/^my account holds the following assets$/, function (table, callback) {
        this.createAssets(table.hashes(), callback);
    });

    this.Given(/^my investment in the account is (\d+)$/, function (investment, callback) {
        this.setInvestment(investment);
        callback();
    });

    this.When(/^I calculate the account summary$/, function (callback) {
        this.getAccount(callback);
    });

    this.Then(/^I should get the following account summary$/, function (table, callback) {
        this.assertAccountSummary(table.hashes()[0]);
        callback();
    });
};