// 服务器

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

async function hello (ctx) {
    ctx.body = 'hello koa';
}

router.get('/', hello);

app.use(router.routes());

const { serverPort } = require('./consts.js');

app.listen(serverPort);

console.log(`[SUCCESS] mock server 已启动 localhost:${ serverPort }`);
