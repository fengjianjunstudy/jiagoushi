const Router = require('./router')
let http = require('http');

function Application(){
    // this.lazyrouter();
}
Application.prototype.lazyrouter = function(){
    if(!this._router){
        this._router = new Router();
    }
}
Application.prototype.get = function(path,handler){
    this.lazyrouter();
    this.router.get(path,handler)

}
Application.prototype.listen = function(){
    let server = http.createServer(function(req,res){
        function done(){
            res.end(`cannot ${req.method} ${req.url}`)
        
        }
        this._router.handle(req,res,done)
    })
    server.listen.apply(server,arguments);

}
module.exports = Application;