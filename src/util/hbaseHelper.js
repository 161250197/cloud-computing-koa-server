const hbase = require('hbase');
const { hbaseHost, hbasePort } = require('../data/consts');

let client = undefined;

function initClient (callback) {
    client = hbase({ host: hbaseHost, port: hbasePort });
    client.tables((error, tables) => {
        const success = !error;
        callback(success);
        if (success) {
            console.log('[INFO] tables: ', tables);
        }
    });
}

function getCartoonInfo (id, onfail, onsuccess) {
    // TODO 等文档确定
    onfail(id, onsuccess);
}

function getCartoonRankPath (id, onfail, onsuccess) {
    // TODO 等文档确定
    onfail(id, onsuccess);
}

function getRecommendUsers (id, onfail, onsuccess) {
    const RELATIVE_USERS_TABLE_NAME = 'relativeUsers';
    const relativeUsersRow = client.table(RELATIVE_USERS_TABLE_NAME).row(id);
    const RELATIVE_USERS_COLUMN = 'relative:neighbors';
    relativeUsersRow.get(RELATIVE_USERS_COLUMN, (error, result) => {
        if (error || !result) {
            onfail();
            return;
        }
        const data = result[0];
        onsuccess(data);
    });
}

module.exports = {
    initClient,
    getCartoonInfo,
    getCartoonRankPath,
    getRecommendUsers
};
