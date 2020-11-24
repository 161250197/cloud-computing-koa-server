const { RANDOM_USERS, RECOMMEND_USERS } = require('../data/consts');
const { createRecommendUsers } = require('../util/dataCreator');

function getRandomUsers (ctx) {
    const { count } = ctx.query;
    ctx.body = createRecommendUsers(undefined, count);
}

async function getRecommendUsers (ctx) {
    const { id } = ctx.query;
    // eslint-disable-next-line require-atomic-updates
    ctx.body = await require('./../util/hbaseHelper').getRecommendUsers(id);
}

function setupRouter (router) {
    router.get(RANDOM_USERS, getRandomUsers);
    router.get(RECOMMEND_USERS, getRecommendUsers);
}

module.exports = setupRouter;
