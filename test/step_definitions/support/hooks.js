'use strict';

var knex = require(process.cwd() + '/server/common/orm').knex;

var myHooks = function() {

    this.Before(function(callback) {

        // Truncate assets
        knex.raw('truncate table assets cascade')
        .then(function() {
            callback();
        })
        .catch(function(e) {
            console.error(e);
        });
    });
};

module.exports = myHooks;