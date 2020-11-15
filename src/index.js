// 服务器

const { serverPort, HOT_ONE_DATE_DATA, HOT_RANGE_DATE_DATA } = require('./consts.js');
const { createMockData } = require('./util/mockData');

const Koa = require('koa');
const app = new Koa();

// bodyParser
const createBodyParser = require('koa-bodyparser');
const bodyParser = createBodyParser();
app.use(bodyParser);

// 处理跨域
async function allowOrigin (ctx, next) {
    ctx.set('Access-Control-Allow-Origin', '*');
    await next();
}

app.use(allowOrigin);

// router
const Router = require('koa-router');
const router = new Router();

function hello (ctx) {
    ctx.body = 'hello koa';
}

router.get('/', hello);

function getHotOneDateData (ctx) {
    const time = ctx.query.time;
    console.log(`time: ${ time }`);
    ctx.body = createMockData();
}

router.get(HOT_ONE_DATE_DATA, getHotOneDateData);

function getHotRangeDateData (ctx) {
    const { from, to } = ctx.query;
    console.log(`from: ${ from }`);
    console.log(`to: ${ to }`);
    ctx.body = createMockData();
}

router.get(HOT_RANGE_DATE_DATA, getHotRangeDateData);

app.use(router.routes());

app.listen(serverPort);

console.log(`[SUCCESS] mock server 已启动 localhost:${ serverPort }`);
