const {
    CARTOON_INFO_ARR,
    CARTOON_RANK_PATH,
    TIME_RANGE_CARTOON_RANK_PATH
} = require('../../consts');
const {
    createMockCartoonInfoArr,
    createMockCartoonRankPath,
    createMockTimeRangeCartoonRankPath
} = require('./../../util/mockData');

function getCartoonInfoArr (ctx) {
    ctx.body = createMockCartoonInfoArr();
}

function getCartoonRankPath (ctx) {
    ctx.body = createMockCartoonRankPath();
}

function getTimeRangeCartoonRankPath (ctx) {
    let { from, to } = ctx.query;
    from = Number(from);
    to = Number(to);
    ctx.body = createMockTimeRangeCartoonRankPath(from, to);
}

function setupRouter (router) {
    router.get(CARTOON_INFO_ARR, getCartoonInfoArr);
    router.get(CARTOON_RANK_PATH, getCartoonRankPath);
    router.get(TIME_RANGE_CARTOON_RANK_PATH, getTimeRangeCartoonRankPath);
}

module.exports = setupRouter;
