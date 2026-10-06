import express, { urlencoded } from "express";

import dotenv from "dotenv"
dotenv.configDotenv();

import ConnectDB from "./config/db.js";

import StudentRoutes from "./Routes/StudentRoutes.js";
import session from "express-session";

ConnectDB();

const app = express();
const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(urlencoded({extended: false}));

app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false
}));

app.use("/", StudentRoutes);

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
});