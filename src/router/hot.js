
const HOT_TODAY_DATA = '/hotTodayData';
const HOT_RANGE_DATE_DATA = '/hotRangeDateData';
const HOT_DETAIL = '/hotDetail';

const { createMockData, createMockDetail } = require('./../util/mockData');

function getHotTodayData (ctx) {
    ctx.body = createMockData();
}

function getHotRangeDateData (ctx) {
    const { from, to } = ctx.query;
    console.log(`from: ${ from }`);
    console.log(`to: ${ to }`);
    ctx.body = createMockData();
}

function getHotDetail (ctx) {
    const { id } = ctx.query;
    ctx.body = createMockDetail(id);
}

function setupHotRouter (router) {
    router.get(HOT_TODAY_DATA, getHotTodayData);
    router.get(HOT_RANGE_DATE_DATA, getHotRangeDateData);
    router.get(HOT_DETAIL, getHotDetail);
}

module.exports = {
    setupHotRouter
};
