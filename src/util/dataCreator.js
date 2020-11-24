function createRecommendUsers (id, userCount = Math.floor(Math.random() * 3) + 3) {
    const fs = require('fs');
    const path = require('path');
    const dirPath = './../data/userList';
    let targetPath = path.resolve(__dirname, dirPath);
    const userLists = fs.readdirSync(targetPath);
    // 还有一个 .gitkeep 文件
    const userListCount = userLists.length - 1;

    const result = [];

    for (let i = 0; i < userCount; i++)
    {
        const userListIndex = Math.floor(Math.random() * userListCount);
        const fileName = `${ userListIndex }.json`;
        const filePath = `${ dirPath }/${ fileName }`;
        targetPath = path.resolve(__dirname, filePath);
        const userList = JSON.parse(fs.readFileSync(targetPath));
        const userCount = userList.length;
        const user = userList[Math.floor(Math.random() * userCount)];
        if (user.id !== id)
        {
            result.push(user);
        }
    }

    return result;
}

function createCartoonRankPath (id) {
    const cartoonInfo = require('./dataManager').getCartoonInfo(id);
    const { firstBroadcastTime, score } = cartoonInfo;
    if (!score)
    {
        return [];
    }
    const { regularTimeToDay, calRangeDate } = require('./math');
    const today = regularTimeToDay(Date.now());
    const count = calRangeDate(firstBroadcastTime, today);
    return createNewRankPath(count, firstBroadcastTime, today, score);
}

function createNewRankPath (count, from, to, score) {
    let arr = [];
    arr.unshift({
        time: to,
        score
    });
    const { calDate, regularScoreDotOneNumber } = require('./math');
    const rest = Math.min(10 - score, score) / 2;
    for (let i = 1; i < count; i++)
    {
        const newTime = calDate(to, -i);
        const newScore = regularScoreDotOneNumber(score + (Math.random() - 0.5) * rest);
        arr.unshift({
            time: newTime,
            score: newScore
        });
    }
    return arr;
}

module.exports = {
    createCartoonRankPath,
    createRecommendUsers
};
