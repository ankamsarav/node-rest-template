'use strict';

var chai = require('chai');
var chaiStats = require('chai-stats');

// Set up chaiStats
chai.use(chaiStats);

// Exports
exports.expect = chai.expect;