const Koa = require('koa')

const app = new Koa();
app.use(async function(ctx,next){
    console.log(ctx)
    console.log(ctx.method)
    console.log(ctx.url)
    console.log(ctx.headers)
    console.log(ctx.query)

    ctx.body = ctx.headers;
})
app.listen(8080)