import Redis from 'ioredis';

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
    tls: {},
});

export async function increaseSearchCount(ip, limit = 5, windowSeconds = 21600) {
    const key = `search_limit:${ip}`;
    const count = parseInt(await redis.get(key)) || 0;

    if (count >= limit) {
        const ttl = await redis.ttl(key);
        return {
            allowed: false,
            ttl,
            remaining: 0,
        };
    }

    if (count === 0) {
        await redis.set(key, 1, 'EX', windowSeconds); // 하루짜리 카운트 시작
    } else {
        await redis.incr(key);
    }

    return {
        allowed: true,
        remaining: limit - count - 1,
    };
}
