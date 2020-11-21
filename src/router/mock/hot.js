const { HOT_TODAY_DATA } = require('../../consts');
const { createMockCartoonTodayData } = require('./../../util/mockData');

function getHotTodayData (ctx) {
    ctx.body = createMockCartoonTodayData();
}

function setupRouter (router) {
    router.get(HOT_TODAY_DATA, getHotTodayData);
}

module.exports = setupRouter;
