const http = require('http');
const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);

/**
 * Reads a JSON file and returns it as response. 
 */
const requestListener = (req, res) => {
  console.log('Got a new request on the backend server!');
  res.writeHead(200, 'OK', {
    'Content-Type': 'application/json'
  });
  readFileAsync('./response.json', { encoding: 'utf8' }).then(data => {
    console.log('Sending back response of size', Buffer.byteLength(data));
    res.end(data);
  });
}

const server = http.createServer(requestListener);
server.listen(8080);
