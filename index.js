const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const hostname = '127.0.0.1';
const port = 3000;

// Gonna try this version and then also the http-server version that is recommended frequently
// https://stackoverflow.com/questions/16333790/node-js-quick-file-server-static-files-over-http
const server = http.createServer((req,res) => {
    const parsedUrl = url.parse(req.url);
    let pathname = `.${parsedUrl.pathname}`;

    const ext = path.parse(pathname).ext;

    // maps file extention to MIME typere
    const map = {
        '.ico': 'image/x-icon',
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.wav': 'audio/wav',
        '.mp3': 'audio/mpeg',
        '.svg': 'image/svg+xml',
        '.pdf': 'application/pdf',
        '.doc': 'application/msword'
    };

    if(!fs.existsSync(pathname)){
        res.statusCode = 404;
        res.end(`File ${pathname} not found.`);
        return;
    }

    if(fs.statSync(pathname).isDirectory()) pathname += '/index' + ext;

    fs.readFile(pathname, function(err, data){
        if(err) {
            res.statusCode = 500;
            res.end(`Error getting the file: ${err}.`);
        } else {
            res.setHeader('Content-type', map[ext] || 'text/plain');
            res.end(data);
        }
    })
})

server.listen(port, hostname, () => {
    console.log(`${hostname}:${port}`)
});