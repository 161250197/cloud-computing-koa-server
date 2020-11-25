const ONE_DAY_TIME = 24 * 60 * 60 * 1000;

function regularTimeToDay (time) {
    const restTime = time % ONE_DAY_TIME;
    return time - restTime;
}

const fs = require("fs");
const path = require("path");
const url = "./../json/cartoonList.json";
const target = path.resolve(__dirname, url);
let data = require(url);
data = data.map(s => {
    s.firstBroadcastTime = regularTimeToDay(s.firstBroadcastTime);
    return s;
});

fs.writeFileSync(target, JSON.stringify(data));
