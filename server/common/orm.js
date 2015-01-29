'use strict';

var dbConfig = {
    client: 'postgresql',
    debug: false,
    connection: {
        host: 'localhost',
        user: '',
        password: '',
        database: 'demo',
        charset: 'utf8'
    }
};

// The two lines below make sure that float column types
// return JavaScript floats instead of strings
var pg = require('pg');
require('pg-parse-float')(pg);

// Create knex and bookshelf
var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');

// Exports
exports.knex = knex;
exports.bookshelf = bookshelf;

console.log('Database initialized');