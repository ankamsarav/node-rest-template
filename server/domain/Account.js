'use strict';

var bookshelf = require('../infrastructure/orm').bookshelf;

var Account = bookshelf.model('Account', {
    tableName: 'accounts'
});

module.exports = Account;
