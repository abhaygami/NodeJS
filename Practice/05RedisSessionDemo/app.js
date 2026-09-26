import express from "express";
import session from "express-session";
import { RedisStore } from "connect-redis";
import { createClient } from "redis";

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.urlencoded({ extended: true }));

const redisClient = createClient();

redisClient.on("error", (err) => {
    console.log("Redis Error:", err);
});

await redisClient.connect();

console.log("Redis connected successfully");

const redisStore = new RedisStore({
    client: redisClient,
    prefix: "session:"
});

app.use(
    session({
        store: redisStore,
        secret: "secretkey",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    })
);

app.get("/", (req, res) => {
    res.render("form");
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "abhay" && password === "abhay123") {
        req.session.username = username;
        res.redirect("/dashboard");
    } else {
        res.send("<script>alert('Invalid credentials');window.location.href='/';</script>");
    }
});

const checkAuth = (req, res, next) => {
    if (req.session.username) {
        next();
    }
    else {
        res.send("<script>alert('Authentication Required');window.location.href='/';</script>");
    }
}

app.get("/dashboard", checkAuth, (req, res) => {
    res.send(`<center><h1>Welcome ${req.session.username}</h1><br><a href="/logout">Logout</a> || <a href="/cars">Cars</a></center>`);
});

app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }
        res.redirect("/");
    });
});

app.get("/cars", checkAuth, (req, res) => {
    res.render("cars");
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});