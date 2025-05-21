const Redis = require('ioredis');

const redis = new Redis({
    host: 'gorgeous-wren-38298.upstash.io',
    port: 6379,
    password: 'AZWaAAIjcDE3N2Q5N2M2ODNiYjA0MDdjOTg1OTNjZWRhMzFiMTQyMHAxMA',
    tls: {}, // 🔐 TLS 활성화
    maxRetriesPerRequest: 3, // 너무 많이 재시도 안 하도록 제한
});

module.exports = redis;
