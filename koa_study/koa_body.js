const Koa = require('koa');
const bodyParser = require('koa-bodyparser')

let app = new Koa();
app.use(async function(ctx,next){
    if(ctx.method == 'GET' && ctx.url == '/'){
        ctx.body = (`
            <form method="POST" action ="/user">
                <input type="text" name = "username">
                <input type="submit" value ="提交">
            </form>
        `)
    }else{
        next();
    }
})
app.use(async function(ctx,next){
    if(ctx.method == 'POST' && ctx.url == "/user"){
        let result = await parser(ctx.req)
        console.log(result);
        ctx.body = result;
    }else{
        next();
    }
})
function parser(req){
    return new Promise(function(resolve,reject){
        let body = []
        req.on('data',function(data){
            
            body.push(data)
        })
        req.on('end',function(data){
            console.log('body',body)
            resolve(Buffer.concat(body).toString());
        })
    })
}
app.listen(8080)