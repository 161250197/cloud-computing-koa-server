const MOCK_COUNT = 26;
const MOCK_NAMES = 'abcdefghijklmnopqrstuvwxyz'.split('');
const VALUE_KEY = 'value';
const MOCK_POST_SRC = 'http://img9.doubanio.com/view/photo/s_ratio_poster/public/p2548248276.jpg';

const ONE_DAY_TIME = 24 * 60 * 60 * 1000;

function regularTimeToDay (time) {
    const restTime = time % ONE_DAY_TIME;
    return time - restTime;
}

function randomNum (num) {
    return Math.round(Math.random() * (num || 100));
}

function createMockCartoonInfo (i) {
    const name = MOCK_NAMES[i];
    return {
        name,
        id: `${ i }`,
        firstBroadcastTime: regularTimeToDay(Date.now()),
        postSrc: MOCK_POST_SRC
    };
}

function createMockCartoonInfoData () {
    const result = [];
    for (let i = 0; i < MOCK_COUNT; i++)
    {
        result.push(createMockCartoonInfo());
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
                score: createMockScore(),
                time
            });
        }
    }
    return result;
}

function createMockCartoonTodayData () {
    const result = [];
    const count = Math.min(MOCK_COUNT, MOCK_NAMES.length);
    for (let i = 0; i < count; i++)
    {
        const value = randomNum();
        const info = createMockCartoonInfo(i);
        const data = {
            ...info,
            score: createMockScore(),
            wantWatchSum: randomNum(),
            isWatchingSum: randomNum(),
            watchedSum: randomNum(),
            commendSum: randomNum(),
            thumbUpSum: randomNum(),
            hot: randomNum()
        };
        data[VALUE_KEY] = value;
        result.push(data);
    }
    return result;
}

function createMockScore () {
    return randomNum(10);
}

module.exports = {
    createMockScore,
    createMockCartoonInfoData,
    createMockCartoonRankPath,
    createMockTimeRangeCartoonRankPath,
    createMockCartoonTodayData
};

