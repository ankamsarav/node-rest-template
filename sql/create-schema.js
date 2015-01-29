'use strict';

var dbConfig = {
    client: 'postgresql',
    debug: true,
    connection: {
        host: 'localhost',
        user: '',
        password: '',
        database: 'demo',
        charset: 'utf8'
    }
};

var knex = require('knex')(dbConfig);

knex.schema

    /***** Drop foreign keys *****/
    //.table('assets', function(table) {
    //    table.dropForeign('fund_id');
    //})


    /***** Drop tables *****/
    .dropTableIfExists('assets')


    /***** Create tables (in alphabetic order) *****/
    // Assets
    .createTable('assets', function (table) {
        table.increments('id');
        table.string('asset_class', 32).notNullable();
        table.decimal('market_value', 19, 4).notNullable();
        table.decimal('percent_allocation', 19, 4).notNullable();
        table.decimal('percent_return', 19, 4).notNullable();
    })


    /***** Add foreign keys *****/
    //.table('assets', function(table) {
    //    table.integer('fund_id').unsigned().notNullable().references('funds.id');
    //})


    // Finally, add a .catch handler for the promise chain
    .catch(function (e) {
        console.error(e);
    });