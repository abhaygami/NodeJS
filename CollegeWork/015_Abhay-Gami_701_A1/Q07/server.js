import http from 'http';

const PORT = 8000;

const server = http.createServer(async (req, res) => {
    // 1. Serve a beautiful landing page on root '/'
    if (req.url === '/' && req.method === 'GET') {
        const homeHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Google Page Fetcher</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap');
                
                :root {
                    --bg-color: #0b0f19;
                    --card-bg: rgba(255, 255, 255, 0.03);
                    --card-border: rgba(255, 255, 255, 0.08);
                    --primary-color: #4f46e5;
                    --primary-hover: #6366f1;
                    --text-main: #f3f4f6;
                    --text-muted: #9ca3af;
                }

                body {
                    margin: 0;
                    padding: 0;
                    background-color: var(--bg-color);
                    color: var(--text-main);
                    font-family: 'Outfit', sans-serif;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    overflow: hidden;
                }

                /* Background subtle shapes */
                .circle-bg {
                    position: absolute;
                    width: 400px;
                    height: 400px;
                    background: radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, rgba(0,0,0,0) 70%);
                    top: -100px;
                    left: -100px;
                    z-index: 0;
                }

                .card {
                    background: var(--card-bg);
                    border: 1px solid var(--card-border);
                    backdrop-filter: blur(16px);
                    padding: 3rem;
                    border-radius: 24px;
                    text-align: center;
                    max-width: 500px;
                    width: 90%;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
                    z-index: 1;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 30px 60px rgba(79, 70, 229, 0.15);
                }

                h1 {
                    font-size: 2.2rem;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                    background: linear-gradient(135deg, #a5b4fc, #818cf8, #6366f1);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                p {
                    font-size: 1rem;
                    color: var(--text-muted);
                    line-height: 1.6;
                    margin-bottom: 2rem;
                }

                .btn {
                    display: inline-block;
                    background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
                    color: white;
                    text-decoration: none;
                    padding: 0.85rem 2rem;
                    border-radius: 12px;
                    font-weight: 600;
                    font-size: 1rem;
                    box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
                    transition: all 0.2s ease-in-out;
                }

                .btn:hover {
                    transform: scale(1.05);
                    box-shadow: 0 6px 20px rgba(79, 70, 229, 0.5);
                }

                .btn:active {
                    transform: scale(0.98);
                }
            </style>
        </head>
        <body>
            <div class="circle-bg"></div>
            <div class="card">
                <h1>Google Proxy Service</h1>
                <p>This Node.js server retrieves the current live markup from Google's homepage using the native Fetch API with an asynchronous async-await pipeline, then returns it directly to your browser.</p>
                <a href="/google" class="btn">Fetch Google Page</a>
            </div>
        </body>
        </html>
        `;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(homeHtml);
    }
    // 2. Fetch Google homepage markup and respond on '/google'
    else if (req.url === '/google' && req.method === 'GET') {
        try {
            console.log(`[Q07] Incoming request: GET /google. Fetching https://www.google.com...`);
            const googleResponse = await fetch('https://www.google.com');
            const googleHtml = await googleResponse.text();
            
            res.writeHead(200, { 
                'Content-Type': 'text/html; charset=UTF-8',
                'Cache-Control': 'no-cache'
            });
            res.end(googleHtml);
            console.log(`[Q07] Successfully served Google homepage content.`);
        } catch (err) {
            console.error(`[Q07] Error fetching Google page:`, err);
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
            res.end(`Internal Server Error: Failed to fetch Google page.\nDetails: ${err.message}`);
        }
    }
    // 3. 404 Fallback
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`[Q07] Web server successfully launched at http://localhost:${PORT}`);
});
