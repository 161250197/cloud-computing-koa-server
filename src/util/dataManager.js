const { sortData, regularTimeToDay, calRangeDate, calDate } = require('./math');

let userInfoMap;

function createUserInfoMap () {
    const userList = require('./../data/userList.json');
    userInfoMap = {};
    userList.forEach(userInfo => userInfoMap[userInfo.id] = userInfo);
}

function getUserInfo (id) {
    return userInfoMap[id];
}

function initData () {
    createUserInfoMap();
    splitUserList();
    require('./hbaseHelper').initClient();
    refreshCartoonInfoArr();
    initCartoonRankAllPath();
}

function splitUserList () {
    const fs = require('fs');
    const path = require('path');
    const userList = require('./../data/userList.json');
    const count = userList.length;
    const countPerFile = 100;
    const fileCount = Math.ceil(count / countPerFile);
    for (let i = 0; i < fileCount; i++)
    {
        const fileName = `${ i }.json`;
        const filePath = `./../data/userList/${ fileName }`;
        const targetPath = path.resolve(__dirname, filePath);
        const start = i * countPerFile;
        const end = start + countPerFile;
        try
        {
            fs.writeFileSync(targetPath, JSON.stringify(userList.slice(start, end)));
        } catch (e)
        {
            console.log('[ERROR] splitUserList fail', e);
        }
    }
    console.log('[INFO] splitUserList success');
}

const CARTOON_INFO_ARR_PATH = './../data/cartoonInfo.json';

async function refreshCartoonInfoArr () {
    const cartoonIdArr = require('./../data/cartoonIdArr.json');
    const cartoonInfoArr = [];
    const getHbaseCartoonInfo = require('./hbaseHelper').getCartoonInfo;
    for (let id of cartoonIdArr)
    {
        const info = await getHbaseCartoonInfo(id);
        cartoonInfoArr.push(info);
    }
    const fs = require('fs');
    const path = require('path');
    const target = path.resolve(__dirname, CARTOON_INFO_ARR_PATH);
    const HOT_KEY = 'hot';
    const sortedData = sortData(cartoonInfoArr, HOT_KEY, true);
    fs.writeFileSync(target, JSON.stringify(sortedData));
    console.log('[INFO] refreshCartoonInfoArr success');
}

function getCartoonInfoArr () {
    return require(CARTOON_INFO_ARR_PATH);
}

function getCartoonInfo (id) {
    const cartoonInfo = require('./../data/cartoonInfoMap.json')[id];
    return cartoonInfo || { id };
}

const CARTOON_RANK_ALL_PATH = './../data/cartoonRankAllPath.json';
// 最早的十月番剧播出时间 2020-09-30
const firstStartTime = 1601481600000;

async function initCartoonRankAllPath () {
    const cartoonIdArr = require('./../data/cartoonIdArr.json');
    const dataMap = {};
    const { getCartoonRankPath } = require('./hbaseHelper');
    for (let id of cartoonIdArr)
    {
        const rankPath = await getCartoonRankPath(id);
        if (rankPath.length)
        {
            const { name, firstBroadcastTime } = getCartoonInfo(id);
            dataMap[id] = { name, firstBroadcastTime, rankPath, index: -1 };
        }
    }
    const today = regularTimeToDay(Date.now());
    const count = calRangeDate(firstStartTime, today) - 1;
    const allPath = [];
    for (let i = 1; i <= count; i++)
    {
        let ranks = [];
        const now = calDate(firstStartTime, i);
        for (let id of cartoonIdArr)
        {
            if (!dataMap[id])
            {
                continue;
            }
            const { name, firstBroadcastTime, rankPath, index } = dataMap[id];
            if (index > 0)
            {
                ranks.push({ id, name, score: rankPath[index].score });
                dataMap[id].index = index + 1;
            } else if (now >= firstBroadcastTime)
            {
                ranks.push({ id, name, score: rankPath[0].score });
                dataMap[id].index = 1;
            }
        }
        ranks = sortData(ranks, 'score');
        allPath.push(ranks);
    }

    const fs = require('fs');
    const path = require('path');
    const target = path.resolve(__dirname, CARTOON_RANK_ALL_PATH);
    fs.writeFileSync(target, JSON.stringify(allPath));
    console.log('[INFO] initCartoonRankAllPath success');
}

function getTimeRangeCartoonRankPath (from, to) {
    const allPath = require(CARTOON_RANK_ALL_PATH);
    const start = calRangeDate(firstStartTime, from);
    const count = calRangeDate(from, to);
    return allPath.slice(start, start + count);
}

module.exports = {
    getTimeRangeCartoonRankPath,
    getCartoonInfo,
    getCartoonInfoArr,
    getUserInfo,
    initData,
    splitUserList
};
