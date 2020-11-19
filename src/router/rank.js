
const CARTOON_INFO_ARR = '/cartoonInfoArr';
const CARTOON_RANK_PATH = '/cartoonRankPath';
const TIME_RANGE_CARTOON_RANK_PATH = '/timeRangeCartoonRankPath';

const {
    createMockCartoonInfoArr,
    createMockCartoonRankPath,
    createMockTimeRangeCartoonRankPath
} = require('./../util/mockData');

function getCartoonInfoArr (ctx) {
    // TODO
    ctx.body = createMockCartoonInfoArr();
}

function getCartoonRankPath (ctx) {
    // TODO
    const { id } = ctx.query;
    console.log(id);
    ctx.body = createMockCartoonRankPath();
}

function getTimeRangeCartoonRankPath (ctx) {
    // TODO
    const { from, to } = ctx.query;
    ctx.body = createMockTimeRangeCartoonRankPath(from, to);
}

function setupRankRouter (router) {
    router.get(CARTOON_INFO_ARR, getCartoonInfoArr);
    router.get(CARTOON_RANK_PATH, getCartoonRankPath);
    router.get(TIME_RANGE_CARTOON_RANK_PATH, getTimeRangeCartoonRankPath);
}

module.exports = setupRankRouter;
