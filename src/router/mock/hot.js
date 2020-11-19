const { HOT_TODAY_DATA } = require('../../consts');
const { createMockCartoonTodayData } = require('./../../util/mockData');

function getHotTodayData (ctx) {
    console.log(ctx);
    ctx.body = createMockCartoonTodayData();
}

function setupHotRouter (router) {
    router.get(HOT_TODAY_DATA, getHotTodayData);
}

module.exports = setupHotRouter;
