
const CARTOON_INFO = '/cartoonInfo';
const CARTOON_RANK_PATH = '/cartoonRankPath';
const TIME_RANGE_CARTOON_RANK_PATH = '/timeRangeCartoonRankPath';

const {
    createMockCartoonInfoArr,
    createMockCartoonRankPath,
    createMockTimeRangeCartoonRankPath
} = require('./../../util/mockData');

function getCartoonInfo (ctx) {
    ctx.body = createMockCartoonInfoArr();
}

function getCartoonRankPath (ctx) {
    ctx.body = createMockCartoonRankPath();
}

function getTimeRangeCartoonRankPath (ctx) {
    const { from, to } = ctx.query;
    ctx.body = createMockTimeRangeCartoonRankPath(from, to);
}

function setupRankRouter (router) {
    router.get(CARTOON_INFO, getCartoonInfo);
    router.get(CARTOON_RANK_PATH, getCartoonRankPath);
    router.get(TIME_RANGE_CARTOON_RANK_PATH, getTimeRangeCartoonRankPath);
}

module.exports = setupRankRouter;
