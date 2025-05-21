const Redis = require('ioredis');

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    tls: {}, // 🔐 TLS 활성화
    maxRetriesPerRequest: 3, // 너무 많이 재시도 안 하도록 제한
});

module.exports = redis;
