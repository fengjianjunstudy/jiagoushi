const http = require('http');
const compose = require('koa-compose')
class MyKoa{
    constructor(){
        this.middleware = [];
    }
    use(fn){
        this.middleware.push(fn)
    }
    listen(){
        let server = http.createServer(this.callback());
        server.listen.apply(server,arguments)
    }
    callback(){
        let fnMiddleware = this.compose(this.middleware)
        let _self = this;
        return function(req,res){
            let ctx = {};
            ctx.request = Object.create(req);
            ctx.response = Object.create(res);
            let result = fnMiddleware(ctx)
            result.then(() =>{_self.handleResponse(ctx)},(err)=>{console.log()}).catch(()=>{
                console.log('报错')
            })
        }
    }
    compose(){
        let _self = this;
        return function(ctx){
            let index = 0;
            function next(i){
                let fn = _self.middleware[i];
                if(!fn){
                    return Promise.resolve(1);
                }
                return Promise.resolve(fn(ctx,next.bind(null,i+1)))
            }
            
            return next(0)
        }
    }
    handleResponse(ctx){
        console.log(ctx.body);
        ctx.response.end(ctx.body)
    }
}
module.exports = MyKoa;