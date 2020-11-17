const MOCK_COUNT = 10;
const MOCK_NAMES = 'abcdefghijklmnopqrstuvwxyz'.split('');
const VALUE_KEY = 'value';

function sortData (source) {
    source.sort((a, b) => {
        return a[VALUE_KEY] - b[VALUE_KEY];
    });

    return source;
}

function randomNum (num) {
    return Math.round(Math.random() * (num || 100));
}

function createMockData () {
    const result = [];
    const count = Math.min(MOCK_COUNT, MOCK_NAMES.length);
    for (let i = 0; i < count; i++)
    {
        const name = MOCK_NAMES[i];
        const value = randomNum();
        const data = {
            name,
            id: `${ i }`
        };
        data[VALUE_KEY] = value;
        result.push(data);
    }
    return sortData(result);
}

function createMockDetail (id) {
    const index = Number(id);
    const name = MOCK_NAMES[index];
    return {
        name,
        id,
        firstBroadcastTime: Date.now(),
        wantWatchSum: randomNum(),
        isWatchingSum: randomNum(),
        watchedSum: randomNum(),
        commendSum: randomNum(),
        score: randomNum(10),
        thumbUpSum: randomNum()
    };
}

module.exports = {
    createMockDetail,
    createMockData
};

