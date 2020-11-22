const { RANDOM_USERS, RECOMMEND_USERS } = require('../../data/consts');
const { createMockUserData } = require('./../../util/mockData');

function getRandomUsers (ctx) {
    const { count } = ctx.query;
    ctx.body = createMockUserData(count);
}

function getRecommendUsers (ctx) {
    const count = Math.ceil(Math.random() * 5);
    ctx.body = createMockUserData(count);
}

function setupRouter (router) {
    router.get(RANDOM_USERS, getRandomUsers);
    router.get(RECOMMEND_USERS, getRecommendUsers);
}

module.exports = setupRouter;
