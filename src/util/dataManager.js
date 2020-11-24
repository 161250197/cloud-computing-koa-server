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
}

function splitUserList () {
    const fs = require('fs');
    const path = require('path');
    const userList = require('./../data/userList.json');
    const count = userList.length;
    const countPerFile = 100;
    const fileCount = Math.ceil(count / countPerFile);
    for (let i = 0; i < fileCount; i++) {
        const fileName = `${i}.json`;
        const filePath = `./../data/userList/${fileName}`;
        const targetPath = path.resolve(__dirname, filePath);
        const start = i * countPerFile;
        const end = start + countPerFile;
        try {
            fs.writeFileSync(targetPath, JSON.stringify(userList.slice(start, end)));
        } catch (e) {
            console.log('[ERROR] splitUserList fail', e);
        }
    }
    console.log('[INFO] splitUserList success');
}

module.exports = {
    getUserInfo,
    initData,
    splitUserList
};
