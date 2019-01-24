const MyKoa = require('./my-koa');

let app = new MyKoa();
app.use(async function(ctx,next){
    console.log(1)
    ctx.body = 'hello'
    next();
    console.log(2);
})
app.use(async function(ctx,next){
    console.log(3)
    ctx.body += 'word'
    next()
    console.log(4)
})
app.use(async function(ctx,next){
    console.log(5)
})
app.listen(8089,()=>{
    console.log('mykoa 服务启动')
})