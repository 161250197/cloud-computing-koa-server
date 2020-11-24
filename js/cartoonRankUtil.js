const rawCartoonRank = require("./../json/rawCartoonRank.json");
const cartoonList = require("./../json/cartoonList.json");
const cartoonInfoMap = require("./../json/cartoonInfoMap.json");

function createScoreMap ([star5, star4, star3, star2, star1]) {
    return {
        star5, star4, star3, star2, star1
    };
}

for (let i = 0; i < rawCartoonRank.length; i++)
{
    const id = cartoonList[i].id;
    const { starCounts } = rawCartoonRank[i];
    if (starCounts)
    {
        cartoonInfoMap[id].scoreMap = createScoreMap(starCounts);
    }
}

const fs = require("fs");
const path = require("path");
const target = path.resolve(__dirname, "./../json/newCartoonInfoMap.json");
fs.writeFileSync(target, JSON.stringify(cartoonInfoMap));
