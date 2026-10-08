import express from "express";
import redisClient from "../config/redis.js";
import {
    acquireLock,
    releaseLock
} from "../utils/redisLock.js";

const router = express.Router();

router.post("/order", async (req, res) => {

    const lockKey = "lock:order-processing";

    const lockValue = await acquireLock(
        redisClient,
        lockKey,
        10000
    );

    if (!lockValue) {
        return res.status(409).json({
            success: false,
            message: "Another order is currently being processed. Please try again."
        });
    }

    console.log("🔒 Lock acquired");

    try {

        console.log("📦 Processing order...");

        // Simulating a time-consuming operation
        await new Promise(resolve => {
            setTimeout(resolve, 5000);
        });

        console.log("✅ Order processing completed");

        res.status(200).json({
            success: true,
            message: "Order processed successfully",
            processingTime: "5 seconds"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Error while processing order"
        });

    } finally {

        await releaseLock(
            redisClient,
            lockKey,
            lockValue
        );

        console.log("🔓 Lock released");
    }
});

export default router;