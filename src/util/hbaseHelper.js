const hbase = require('hbase');
const { hbaseHost, hbasePort } = require('../data/consts');

let client = undefined;

function initClient (callback) {
    client = hbase({ host: hbaseHost, port: hbasePort });
    client.tables((error) => callback(!error));
}

module.exports = {
    initClient
};
