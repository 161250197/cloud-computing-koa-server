const {
    CARTOON_INFO_ARR,
    CARTOON_RANK_PATH,
    TIME_RANGE_CARTOON_RANK_PATH
} = require('../data/consts');
const {
    createMockTimeRangeCartoonRankPath
} = require('./../util/mockData');

async function getCartoonInfoArr (ctx) {
    let cartoonInfo = require('./../util/dataManager').getCartoonInfoArr();
    cartoonInfo = cartoonInfo.map(
        ({
            firstBroadcastTime,
            id,
            name,
            score,
            postSrc,
            homepage
        }) => {
            return {
                firstBroadcastTime,
                id,
                name,
                score,
                postSrc,
                homepage
            };
        });
    ctx.body = cartoonInfo;
}

async function getCartoonRankPath (ctx) {
    const { id } = ctx.query;
    // eslint-disable-next-line require-atomic-updates
    ctx.body = await require('./../util/hbaseHelper').getCartoonRankPath(id);
}

function getTimeRangeCartoonRankPath (ctx) {
    // TODO
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
