const MOCK_COUNT = 26;
const MOCK_NAMES = 'abcdefghijklmnopqrstuvwxyz'.split('');
const VALUE_KEY = 'value';

const TODAY_TIME = 24 * 60 * 60 * 1000;

function regularTimeToDay (time) {
    const restTime = time % TODAY_TIME;
    return time - restTime;
}

function randomNum (num) {
    return Math.round(Math.random() * (num || 100));
}

function createMockCartoonTodayData () {
    const result = [];
    const count = Math.min(MOCK_COUNT, MOCK_NAMES.length);
    for (let i = 0; i < count; i++)
    {
        const name = MOCK_NAMES[i];
        const value = randomNum();
        const data = {
            name,
            id: `${ i }`,
            firstBroadcastTime: regularTimeToDay(Date.now()),
            postSrc: 'http://img9.doubanio.com/view/photo/s_ratio_poster/public/p2548248276.jpg',
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
    createMockCartoonTodayData
};

