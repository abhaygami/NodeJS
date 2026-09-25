import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

connectDB();

app.use("/api/students", studentRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});