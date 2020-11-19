// 服务器

const { serverPort, mockMode } = require('./consts.js');
const setupFuncs = mockMode
    ? [
        require('./router/mock/hot'),
        require('./router/mock/rank')
    ]
    : [
        require('./router/hot'),
        require('./router/rank')
    ];

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

setupFuncs.forEach(func => func(router));

app.use(router.routes());

app.listen(serverPort);

console.log(`[SUCCESS] mock server 已启动 localhost:${ serverPort }`);
