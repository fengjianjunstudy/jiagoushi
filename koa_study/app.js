const Koa = require('koa')
const static = require('koa-static')
const path = require('path');

const app = new Koa();
app.use(static(path.join(__dirname,'public')))
//ctx 包括常见的方法和属性
// app.use(async function(ctx,next){
//     console.log(ctx.url);
//     next();
//     console.log('next')
// })
// app.use(async function(ctx,next){
//     console.log(2)
//     next();
// })
app.listen(8080)