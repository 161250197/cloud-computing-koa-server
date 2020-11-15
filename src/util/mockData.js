const MOCK_COUNT = 10;
const MOCK_CITY_NAMES = 'abcdefghijklmnopqrstuvwxyz'.split('');
const VALUE_KEY = 'value';

function sortData (source) {
    source.sort((a, b) => {
        return a[VALUE_KEY] - b[VALUE_KEY];
    });

    return source;
}

function createMockData () {
    const result = [];
    const count = Math.min(MOCK_COUNT, MOCK_CITY_NAMES.length);
    for (let i = 0; i < count; i++)
    {
        const city = MOCK_CITY_NAMES[i];
        const value = Math.round(Math.random() * 100);
        const data = {
            city,
            id: i
        };
        data[VALUE_KEY] = value;
        result.push(data);
    }
    return sortData(result);
}

module.exports = {
    createMockData
};

