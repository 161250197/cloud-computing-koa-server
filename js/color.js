const fs = require("fs");
const path = require("path");
const rawColorList = require("./../json/rawColorList.json");
const colorList = require("./../json/colorList.json");
const cartoonList = require("./../json/cartoonList.json");

function getColors () {
    console.log(JSON.stringify([...document.querySelectorAll(".hex__3LAlu")].map(e => e.innerText)));
}

function filterColor () {
    const list = [];
    const map = {};
    for (let color of rawColorList)
    {
        if (!map[color])
        {
            map[color] = true;
            list.push(color);
        }
    }
    const targetPath = path.resolve(__dirname, "./../json/colorList.json");
    fs.writeFileSync(targetPath, JSON.stringify(list));
}

function createColorMap () {
    const map = {};
    const count = cartoonList.length;
    for (let i = 0; i < count; i++)
    {
        const { name } = cartoonList[i];
        const color = colorList[i];
        if (!color)
        {
            throw Error(["color not find index: ", i].join(""));
        }
        map[name] = color;
    }
    const targetPath = path.resolve(__dirname, "./../json/colorMap.json");
    fs.writeFileSync(targetPath, JSON.stringify(map));
}
