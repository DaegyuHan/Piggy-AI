import Redis from 'ioredis';

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
    tls: {},
});

export async function increaseSearchCount(ip, limit = 5, windowSeconds = 21600) {
    const key = `search_limit:${ip}`;
    const current = await redis.get(key);
    const count = parseInt(current ?? '0');

    if (count >= limit) {
        const ttl = await redis.ttl(key);
        return {
            allowed: false,
            ttl,
            remaining: 0,
        };
    }

    if (count === 0) {
        // 새로 시작하는 카운트
        await redis.set(key, 1, 'EX', windowSeconds);
        return {
            allowed: true,
            ttl: windowSeconds,
            remaining: limit - 1,
        };
    } else {
        // 기존 사용자: 증가만 하고 TTL 유지
        await redis.incr(key);
        const ttl = await redis.ttl(key);
        return {
            allowed: true,
            ttl,
            remaining: limit - count - 1,
        };
    }
}
