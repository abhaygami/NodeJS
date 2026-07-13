import http from 'http';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const staticServer = require('node-static');

const PORT = 8000;

// Point node-static to the public folder
const fileServer = new staticServer.Server('./public');

const server = http.createServer((req, res) => {
    req.addListener('end', () => {
        // Serves index.html on "/" automatically, plus any referenced static assets
        fileServer.serve(req, res, (err) => {
            if (err) {
                res.writeHead(err.status, err.headers);
                res.end('<h1>404 Not Found</h1>');
            }
        });
    }).resume();
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});