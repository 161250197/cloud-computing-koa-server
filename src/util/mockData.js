const MOCK_COUNT = 25;
const MOCK_USER_DATA = [
    {
        'name': '四不象',
        'id': '1832573'
    },
    {
        'name': '王贫困',
        'id': '34873691'
    },
    {
        'name': 'zlic',
        'id': '200731406'
    },
    {
        'name': '远子',
        'id': '14597285'
    },
    {
        'name': '马亿',
        'id': '64563895'
    }
];
const cartoonList = require('../data/cartoonList.json');

function createMockUserData (count) {
    const dataLen = MOCK_USER_DATA.length;
    count = Math.min(count, dataLen);
    const data = [...MOCK_USER_DATA, ...MOCK_USER_DATA];
    const start = Math.floor(Math.random() * dataLen);
    const result = data.slice(start, start + count);
    return result;
}

const ONE_DAY_TIME = 24 * 60 * 60 * 1000;

function sortData (source, key) {
    source.sort((a, b) => {
        return a[key] - b[key];
    });

    return source;
}

function regularTimeToDay (time) {
    const restTime = time % ONE_DAY_TIME;
    return time - restTime;
}

function randomNum (num) {
    return Math.round(Math.random() * (num || 100));
}

function createMockCartoonInfo (i) {
    const cartoon = cartoonList[i];
    return {
        ...cartoon,
        score: createMockScore()
    };
}

function createMockCartoonInfoArr () {
    const result = [];
    for (let i = 0; i < MOCK_COUNT; i++)
    {
        result.push(createMockCartoonInfo(i));
    }
    return result;
}

function createMockCartoonRankPath () {
    const rankPath = [];
    let time = regularTimeToDay(Date.now());
    for (let i = 0; i < MOCK_COUNT; i++)
    {
        const rankInfo = {
            score: createMockScore(),
            time
        };
        rankPath.unshift(rankInfo);
        time -= ONE_DAY_TIME;
    }
    return rankPath;
}

function createMockTimeRangeCartoonRankPath (from, to) {
    let time = from;
    const result = [];
    for (; time <= to; time += ONE_DAY_TIME)
    {
        const rankArr = [];
        for (let i = 0; i < MOCK_COUNT; i++)
        {
            const info = createMockCartoonInfo(i);
            rankArr.push({
                ...info,
                time
            });
        }
        result.push(sortData(rankArr, 'score'));
    }
    return result;
}

function createMockCartoonTodayData () {
    const result = [];
    const count = Math.min(MOCK_COUNT, cartoonList.length);
    for (let i = 0; i < count; i++)
    {
        const info = createMockCartoonInfo(i);
        const data = {
            ...info,
            wantWatchSum: randomNum(),
            isWatchingSum: randomNum(),
            watchedSum: randomNum(),
            commendSum: randomNum(),
            thumbUpSum: randomNum(),
            hot: randomNum()
        };
        result.push(data);
    }
    return result;
}

function createMockScore () {
    return randomNum(10);
}

module.exports = {
    createMockUserData,
    createMockScore,
    createMockCartoonInfoArr,
    createMockCartoonRankPath,
    createMockTimeRangeCartoonRankPath,
    createMockCartoonTodayData
};

