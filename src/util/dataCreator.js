function createRecommendUsers (id, userCount = Math.floor(Math.random() * 3) + 3) {
    const fs = require('fs');
    const path = require('path');
    const dirPath = './../data/userList';
    let targetPath = path.resolve(__dirname, dirPath);
    const userLists = fs.readdirSync(targetPath);
    // 还有一个 .gitkeep 文件
    const userListCount = userLists.length - 1;

    const result = [];

    for (let i = 0; i < userCount; i++) {
        const userListIndex = Math.floor(Math.random() * userListCount);
        const fileName = `${userListIndex}.json`;
        const filePath = `${dirPath}/${fileName}`;
        targetPath = path.resolve(__dirname, filePath);
        const userList = JSON.parse(fs.readFileSync(targetPath));
        const userCount = userList.length;
        const user = userList[Math.floor(Math.random() * userCount)];
        if (user.id !== id) {
            result.push(user);
        }
    }

    return result;
}

module.exports = {
    createRecommendUsers
};
