import http from 'http';

const PORT = 8000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=UTF-8' });
    res.end('Hello from Q08 server.js!');
});

server.listen(PORT, () => {
    console.log(`[Q08] Server running at http://localhost:${PORT}`);
    // Auto-shutdown after 1 second when started as script to keep the port clear
    setTimeout(() => {
        console.log("[Q08] Gracefully shutting down the server...");
        server.close();
        process.exit(0);
    }, 1000);
});
