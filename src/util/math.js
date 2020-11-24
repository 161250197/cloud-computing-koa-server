const ONE_DAY_TIME = 24 * 60 * 60 * 1000;

function regularTimeToDay (time) {
    const restTime = time % ONE_DAY_TIME;
    return time - restTime;
}

function calDate (time, dayCount) {
    return time + dayCount * ONE_DAY_TIME;
}

function regularScoreDotOne (score) {
    const individual = `${ Math.floor(score) }`;
    const rest = Math.floor(score * 10) % 10;
    if (rest === 0)
    {
        return individual;
    }
    return `${ individual }.${ rest }`;
}

function sortData (source, key, down) {
    source.sort((a, b) => {
        return down ? b[key] - a[key] : a[key] - b[key];
    });

    return source;
}

function calRangeDate (from, to) {
    return Math.floor((to - from) / ONE_DAY_TIME);
}

module.exports = {
    calRangeDate,
    sortData,
    calDate,
    regularTimeToDay,
    regularScoreDotOne
};
