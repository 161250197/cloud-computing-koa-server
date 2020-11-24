let client = undefined;

function initClient () {
    const { hbaseHost, hbasePort } = require('../data/consts');
    const config = {
        hosts: [hbaseHost],
        port: hbasePort
    };
    client = require('node-thrift2-hbase')(config);
}

function getCartoonInfo (id, onfail, onsuccess) {
    // TODO 等文档确定
    onfail(id, onsuccess);
}

function getCartoonRankPath (id, onfail, onsuccess) {
    // TODO 等文档确定
    onfail(id, onsuccess);
}

async function getRecommendUsers (id) {
    const TABLE = 'relativeUsers';
    const ROW = id;
    const FAMILY = 'relative';
    const COLUMN = 'neighbors';
    const get = new client.Get(ROW);
    get.addColumn(FAMILY, COLUMN);
    try {
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
    } catch (e) {
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
