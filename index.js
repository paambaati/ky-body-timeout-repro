const http = require('http');
const ky = require('ky-universal');

const BACKEND_API = 'http://localhost:8080';

const api = () => {
    const defaultOptions = {
        prefixUrl: BACKEND_API,
        credentials: 'include',
        keepAlive: true,
        retry: 0,
        hooks: {
            afterResponse: [
                (req, opt, res) => {
                    console.log('KY -> AFTER RESPONSE HOOK!');
                    // The below line does not affect the outcome when it is uncommented either.
                    // return res;
                },
            ],
        },
    };

    return ky.create(defaultOptions);
};

const requestListener = (req, res) => {
    console.log('Got a new request on the frontend server!');
    const request = api().get('example');
    request.then(response => {
        console.log('OK?', response.ok);
        console.log('RESPONSE STATUS =', response.status);
        response.json().then(response => {
            console.log('RESPONSE BODY =', response);
            res.writeHead(200, 'OK', {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(response));
        }).catch(err => {
            console.error('ERROR IN READING BACKEND RESPONSE =', err);
            res.writeHead(500, 'Internal Server Error', {
                'Content-Type': 'text/plain'
            });
            res.end(err);
        });
    });
};

const server = http.createServer(requestListener);
server.listen(8081);
