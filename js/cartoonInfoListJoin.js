const cartoonList = require("./../json/cartoonList.json");
const cartoonInfoList = require("./../json/cartoonInfoList.json");

const cartoonMap = {};
cartoonList.forEach((data) => cartoonMap[data.id] = data);

const fs = require("fs");
const path = require("path");
const target = path.resolve(__dirname, "./../json/newCartoonInfoList.json");
const data = cartoonInfoList.map(data => {
    return {
        ...data,
        ...cartoonMap[data.id]
    };
});

fs.writeFileSync(target, JSON.stringify(data));
