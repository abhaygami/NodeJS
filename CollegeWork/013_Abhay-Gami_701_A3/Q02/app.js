import express from "express";
import path from "path";
import session from "express-session";
import FileStoreFactory from "session-file-store";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8000;

const FileStore = FileStoreFactory(session);

app.use(
    session({
        secret: "secret-key",

        store: new FileStore({
            path: path.join(__dirname, "sessions")
        }),

        resave: false,
        saveUninitialized: false,

        cookie: {
            maxAge: 10 * 60 * 1000,
            httpOnly: true
        }
    })
);

app.use("/",(req, res, next) => {
    console.log(`${req.url} called with ${req.method} `);
    console.log("Session:", req.session);
    console.log("Username:", req.session.user);
    next();
});

app.get("/", (req, res) => {
    let username = req.session.user;

    console.log("Username: ", username);

    if (username) {
        return res.redirect("/dashboard");
    }

    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "abhaygami" && password === "abhay1234") {
        req.session.user = username;
        return res.redirect("/dashboard");
    } else {
        return res.send("<script>alert('Invalid username or password'); window.location.href = '/';</script>");
    }
});

const checkAuth = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.send("<script>alert('Login to go to this Route'); window.location.href = '/';</script>");
    }
}

app.get("/dashboard", checkAuth, (req, res) => {
    const username = req.session.user;

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Dashboard</title>
        </head>

        <body>

            <h1>Welcome, ${username} 👋</h1>

            <p>You are successfully logged in.</p>

            <a href="/cars">View Cars</a>
            <br><br>

            <a href="/logout">Logout</a>

        </body>
        </html>
    `);
});

app.get("/cars", checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "cars.html"));
});

app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.send("<script>alert('Logged out successfully'); window.location.href = '/';</script>");
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});