const { initData } = require('./util/dataManager');

(function () {
    initData();

    const { serverPort } = require('./data/consts');
    const setupFuncs = [
        require('./router/hot'),
        require('./router/rank'),
        require('./router/user')
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
    
    console.log(`[SUCCESS] server 已启动 localhost:${ serverPort }`);
}());
