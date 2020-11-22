const { RANDOM_USERS, RECOMMEND_USERS } = require('../data/consts');
const { createMockUserData } = require('./../util/mockData');

function getRandomUsers (ctx) {
    // TODO
    const { count } = ctx.query;
    ctx.body = createMockUserData(count);
}

function getRecommendUsers (ctx) {
    // TODO
    const { id } = ctx.query;
    console.log(id);
    ctx.body = createMockUserData();
}

function setupRouter (router) {
    router.get(RANDOM_USERS, getRandomUsers);
    router.get(RECOMMEND_USERS, getRecommendUsers);
}

module.exports = setupRouter;
