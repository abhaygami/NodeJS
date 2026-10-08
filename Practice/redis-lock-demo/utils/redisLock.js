import crypto from "crypto";

export async function acquireLock(redisClient, lockKey, expiry = 10000) {

    const lockValue = crypto.randomUUID();

    const result = await redisClient.set(
        lockKey,
        lockValue,
        {
            NX: true,
            PX: expiry
        }
    );

    if (result !== "OK") {
        return null;
    }

    return lockValue;
}


export async function releaseLock(redisClient, lockKey, lockValue) {

    const currentValue = await redisClient.get(lockKey);

    if (currentValue === lockValue) {
        await redisClient.del(lockKey);
        return true;
    }

    return false;
}