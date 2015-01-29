'use strict';

// -----------------------------------------------------------------------------
// Start the HTTP Server and expose the RESTful API
// -----------------------------------------------------------------------------
var api = require('./api/api');
var server = require('http').createServer(api);

var port = process.env.PORT || 8080;

server.listen(port, function() {
    console.log('Listening on port ' + port);
});