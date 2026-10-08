import express from "express";
import dotenv from "dotenv";

import { connectRedis } from "./config/redis.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

await connectRedis();

app.get("/", (req, res) => {
    res.json({
        message: "Redis Distributed Lock Demo",
        status: "Running"
    });
});

app.use("/api", orderRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});