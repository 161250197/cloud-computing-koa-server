function exec (source, target) {
    const fs = require("fs");
    const path = require("path");
    const targetPath = path.resolve(__dirname, target);
    const arr = require(source);
    const map = {};
    arr.forEach(data => {
        map[data.id] = data;
    });
    fs.writeFileSync(targetPath, JSON.stringify(map));
}

exec("./../json/cartoonInfoList.json", "./../json/cartoonInfoMap.json");
exec("./../json/userList.json", "./../json/userMap.json");
