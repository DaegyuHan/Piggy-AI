const redis = require('./redis');

const RANKING_KEY = 'popular_keywords';

async function logSearchKeyword(keyword) {
    if (!keyword) return;

    await redis.zincrby(RANKING_KEY, 1, keyword);
}

module.exports = {
    logSearchKeyword,
};
