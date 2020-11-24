const cartoonList = require("./../json/cartoonList.json");
const rawCartoonInfoList = require("./../json/rawCartoonInfoList.json");

const cartoonMap = {};
cartoonList.forEach(({ id }) => cartoonMap[id] = true);

const fs = require("fs");
const path = require("path");
const target = path.resolve(__dirname, "./../json/cartoonInfoList.json");
const data = rawCartoonInfoList.filter(({ id }) => cartoonMap[id]).map(({ id, score, wantWatchSum, isWatchingSum, watchedSum, shortCommentSum, longCommentSum, recomment, useful, }) => {
    const hot = longCommentSum * 10 + shortCommentSum * 5 + isWatchingSum * 3 + watchedSum * 2 + wantWatchSum * 1;
    return {
        hot,
        id,
        score,
        isWatchingSum,
        watchedSum,
        wantWatchSum,
        CommentSum: shortCommentSum + longCommentSum + recomment,
        thumbUpSum: recomment + useful
    };
});

fs.writeFileSync(target, JSON.stringify(data));
