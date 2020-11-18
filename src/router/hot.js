
const HOT_TODAY_DATA = '/hotTodayData';

const { createMockCartoonTodayData } = require('./../util/mockData');

function getHotTodayData (ctx) {
    ctx.body = createMockCartoonTodayData();
}

function setupHotRouter (router) {
    router.get(HOT_TODAY_DATA, getHotTodayData);
}

module.exports = {
    setupHotRouter
};
