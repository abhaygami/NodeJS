import http from 'http';
import fs from 'fs';

const PORT = 8000;

const server = http.createServer((req, res) => {
    // 1. Serve the HTML page on root URL "/"
    if (req.url === '/' && req.method === 'GET') {
        fs.readFile('./index.html', 'utf-8', (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        });
    }
    // 2. Route required by assignment: GET /gethello
    else if (req.url === '/gethello' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello NodeJS!!');
    }
    // 3. Fallback for 404 Not Found
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Page Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});