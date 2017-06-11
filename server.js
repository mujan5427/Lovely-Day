const express = require('express');
const path    = require('path');
const server  = express();
const port    = 3000;

// serve static assets normally
server.use(express.static(__dirname + '/static'));

// handle each request match to single route with index.html.
server.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'static', 'index.html'));
});

server.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});
