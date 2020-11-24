const { HOT_TODAY_DATA } = require('../data/consts');

function getHotTodayData (ctx) {
    const cartoonInfo = require('./../util/dataManager').getCartoonInfoArr();
    const hotTodayData = cartoonInfo.map(
        ({
            commentSum,
            firstBroadcastTime,
            hot,
            id,
            isWatchingSum,
            name,
            score,
            thumbUpSum,
            wantWatchSum,
            watchedSum
        }) => {
            return {
                commentSum,
                firstBroadcastTime,
                hot,
                id,
                isWatchingSum,
                name,
                score,
                thumbUpSum,
                wantWatchSum,
                watchedSum
            };
        });
    ctx.body = hotTodayData;
}

function setupRouter (router) {
    router.get(HOT_TODAY_DATA, getHotTodayData);
}

module.exports = setupRouter;
