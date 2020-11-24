; (function () {
    const score = document.querySelector("#interest_sectl > div > div.rating_self.clearfix > strong").innerText;
    const scoreCount = Number(document.querySelector("#interest_sectl > div > div.rating_self.clearfix > div > div.rating_sum > a").innerText.split("人")[0]);
    const starCounts = document.querySelector("#interest_sectl > div > div.ratings-on-weight").innerText.split("\n\n").map(str => Math.floor(Number(/([\d.]+)%/.exec(str)[1]) * scoreCount / 100));
    starCounts[4] = scoreCount - starCounts[0] - starCounts[1] - starCounts[2] - starCounts[3];
    const shortCommentSum = Number(/.+ (\d+) .+/.exec(document.querySelector("#comments-section > div.mod-hd > h2 > span > a").innerText)[1]);
    const longCommentSum = Number(/.+ (\d+) .+/.exec(document.querySelector("#reviews-wrapper > header > h2 > span > a").innerText)[1]);
    const commentSum = shortCommentSum + longCommentSum;
    const [, isWatchingSum, watchedSum, wantWatchSum] = /^(\d+)[^/\d]*\/[^/\d]*(\d+)[^/\d]*\/[^/\d]*(\d+).+$/.exec(document.querySelector("#subject-others-interests > div").innerText).map(Number);
    const hot = longCommentSum * 10 + shortCommentSum * 5 + isWatchingSum * 3 + watchedSum * 2 + wantWatchSum * 1;

    const data = {
        commentSum,
        hot,
        isWatchingSum,
        score,
        wantWatchSum,
        watchedSum,
        starCounts
    };

    console.log(`${ JSON.stringify(data) },`);
}());
