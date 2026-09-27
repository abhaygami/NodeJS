import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.configDotenv();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 8000;

sequelize.authenticate()
    .then(() => {
        console.log("Connection to database established");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("Error connecting to database: ", error);
    });
