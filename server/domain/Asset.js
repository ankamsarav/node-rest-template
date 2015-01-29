'use strict';

var bookshelf = require('../common/orm').bookshelf;

var Asset = bookshelf.model('Asset', {
    tableName: 'assets'
});

module.exports = Asset;