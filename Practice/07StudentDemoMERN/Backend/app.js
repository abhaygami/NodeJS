import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./config/db.js";
import StudentRoutes from "./routes/studentRoutes.js"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

ConnectDB();

app.use("/", (req, res, next) => {
    console.log(`${req.method} request made to ${req.url}`);
    next();
});

app.use("/students", StudentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});