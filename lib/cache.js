const redis = require('./redis');

const CACHE_PREFIX = 'search:query:';

async function getCachedResult(query) {
    if (!query) return null;
    const result = await redis.get(`${CACHE_PREFIX}${query}`);
    return result ? JSON.parse(result) : null;
}

async function setCachedResult(query, data, ttlSec = 604800) {
    if (!query || !data) return;
    await redis.set(`${CACHE_PREFIX}${query}`, JSON.stringify(data), 'EX', ttlSec);
}

module.exports = {
    getCachedResult,
    setCachedResult,
};
