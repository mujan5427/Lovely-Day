const express    = require('express');
const bodyParser = require('body-parser');
const routerApi  = require('./server-side/router/api')
const server     = express();
const port       = 3000;

const STATIC_FILE_DIRECTORY = 'static';
const STATIC_FILE_ROOT_HTML = 'index.html';


server.use(express.static(`${ __dirname }/${ STATIC_FILE_DIRECTORY }`));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use('/api', routerApi);

// handle each request match to single route with index.html.
server.get('*', function (request, response) {
  response.sendFile(`${ __dirname }/${ STATIC_FILE_DIRECTORY }/${ STATIC_FILE_ROOT_HTML }`);
});

server.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});
