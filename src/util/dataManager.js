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
    const { getCartoonInfo } = require('./hbaseHelper');
    for (let id of cartoonIdArr)
    {
        const info = await getCartoonInfo(id);
        cartoonInfoArr.push(info);
    }
    const fs = require('fs');
    const path = require('path');
    const target = path.resolve(__dirname, CARTOON_INFO_ARR_PATH);
    fs.writeFileSync(target, JSON.stringify(cartoonInfoArr));
    console.log('[INFO] refreshCartoonInfoArr success');
}

function getCartoonInfoArr () {
    return require(CARTOON_INFO_ARR_PATH);
}

module.exports = {
    getCartoonInfoArr,
    getUserInfo,
    initData,
    splitUserList
};
