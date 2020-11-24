const fs = require("fs");
const path = require("path");
const rawList = require("./../json/rawCartoonList.json");
const homepages = require("./../json/homepages.json");

const list = createCartoonList(rawList, homepages);

const targetPath = path.resolve(__dirname, "./../json/cartoonList.json");

fs.writeFileSync(targetPath, JSON.stringify(list));

function transHomepage (str) {
    return decodeURIComponent(str.split("url=https%3A%2F%2F")[1]).split("&query")[0];
}

function getId (homepage) {
    return homepage.split("subject/")[1].split("/")[0];;
}

function getFirstBroadcastTime (raw) {
    return new Date(raw.开播日期).getTime();
}

function getPostSrc (raw) {
    return raw[""].split("://")[1];
}

function createCartoonList (rawList, homepages) {
    const list = [];

    const count = rawList.length;
    for (let i = 0; i < count; i++)
    {
        const data = {};
        const raw = rawList[i];
        data.name = raw.名称;
        const homepage = transHomepage(homepages[i]);
        data.homepage = homepage;
        const id = getId(homepage);
        data.id = id;
        data.firstBroadcastTime = getFirstBroadcastTime(raw);
        data.postSrc = getPostSrc(raw);
        list.push(data);
    }

    return list;
}
