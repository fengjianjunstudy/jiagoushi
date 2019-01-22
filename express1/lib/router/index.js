const url = require('url')



const Route = require('./route')
const Layer = require('./layer')

function Router (){
    this.stack = [];
}
Router.prototype.xx = function(path){
    let route = new Route(path)
    let layer = new Layer(path,route.dispatch.bind(route));
    layer.route = route;
    this.stack.push(layer);
    return route;
}
Router.prototype.get = function(path,handler){
    let route = this.xx(path);
    route.get(handler)
}
Router.prototype.handle = function(req,res,netx){
    let idx = 0;
    let self = this;
    function next(){
        let layer = this.stack[idx++];
        if(layer.match(pathname) && layer.route&& layer.route.handle_method(req.method)){
            layer.handle_request(req,res,next)
        }else{
            next();
        }

    }
}
module.exports = Router;
/**
 * Router 
 *     stack
 *          layer
 *             path route
 *                  method handler
 * 
 */