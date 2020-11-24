let client = undefined;

function initClient () {
    const { hbaseHost, hbasePort } = require('../data/consts');
    const config = {
        hosts: [hbaseHost],
        port: hbasePort
    };
    client = require('node-thrift2-hbase')(config);
}

async function getCartoonInfo (id) {
    const TABLE = 'douban_anime_statistics';
    const ROW = id;
    const FAMILY = 'record';
    const COLUMN = 'json';
    const get = new client.Get(ROW);
    get.addColumn(FAMILY, COLUMN);
    let result = require('./dataCreator').getCartoonInfo(id);
    try
    {
        const data = await client.getAsync(TABLE, get);
        const cartoonInfo = JSON.parse(data[0]);
        let { score, awaiting, watching, seen, comment_count, total_heat } = cartoonInfo;
        score = Number(score) || 0;
        const wantWatchSum = Number(awaiting) || 0;
        const isWatchingSum = Number(watching) || 0;
        const watchedSum = Number(seen) || 0;
        const commentSum = Number(comment_count) || 0;
        const hot = Number(total_heat) || 0;
        result = {
            ...result,
            wantWatchSum,
            isWatchingSum,
            watchedSum,
            commentSum,
            score,
            hot
        };
    } catch (e)
    {
        console.log('[ERROR] getCartoonInfo', e.toString());
    }
    return result;
}

function getCartoonRankPath (id) {
    // TODO 等文档确定
    console.log(id);
}

async function getRecommendUsers (id) {
    const TABLE = 'relativeUsers';
    const ROW = id;
    const FAMILY = 'relative';
    const COLUMN = 'neighbors';
    const get = new client.Get(ROW);
    get.addColumn(FAMILY, COLUMN);
    try
    {
        const data = await client.getAsync(TABLE, get);
        const assert = require('assert').strict;
        const recommendList = JSON.parse(data[0]);
        assert(recommendList instanceof Array && recommendList.length, 'recommendList check');
        const MAX_COUNT = 5;
        const idArr = recommendList.slice(0, MAX_COUNT).map(({ id }) => id);
        idArr.forEach(id => assert(id !== undefined && /\d+/.test(id), 'id check'));
        const { getUserInfo } = require('./dataManager');
        const result = idArr.map(({ id }) => getUserInfo(id));
        return result;
    } catch (e)
    {
        console.log('[ERROR] getRecommendUsers', e.toString());
    }
    const result = require('./dataCreator').createRecommendUsers(id);
    return result;
}

module.exports = {
    initClient,
    getCartoonInfo,
    getCartoonRankPath,
    getRecommendUsers
};
