const Layer = require('./layer');

function Route(path){
    this.path = path;
    this.stack = [];
    this.methods = {}
}
Route.prototype.handle_method = function(method){
    method = method.toLowerCase();
    return this.methods[method];

}
Route.prototype.get = function(handler){
    let layer = new Layer('/',handler);
    layer.method = method;
    this.methods['get'] = true;
    this.stack.push(layer)
}
Route.prototype.dispatch = function(req,res,out){
    let idx = 0,self=this;
    if(idx >= this.stack.length){
        out();
    }
    function next(){
        let layer = this.stack[idx++];
        if(layer.method == req.method.toLowerCase()){
            layer.handle_request(req,res,next)
        }
    }
    next();
}
module.exports = Route