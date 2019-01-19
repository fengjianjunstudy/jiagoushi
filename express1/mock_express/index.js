let http  = require('http')
let url = require('url');
function createApplication(){
    let app = function(req,res){
        let {pathname} = url.parse(req.url,true) 
        let index = 0;
        !function next(err){
            if(index >= app.routes.length){
                res.end(`cannot ${req.method} ${pathname}`)
            }
            let route = app.routes[index++];
            if(err){
                if(route.method == 'midile'){
                    if(route.path == '/' || pathname.startsWith(route.path)){
                        if(route.handler.length == 4){
                            route.handler(err,req,res,route.handler)
                        }else{
                            next(err);
                        }
                        
                    }else{
                        next(err)
                    }
                }else{
                    next(err);
                }
            }else{
                if(route.method == 'middle'){
                    if(pathname.startsWith(route.path)){
                        route.handler(req,res,next);
                    }else{
                        next();
                    }
                }else{
                    if((route.method == req.method.toLowerCase() || route.method == 'all') && (route.path == pathname || route.path == '*')){
                        return route.handler(req,res); 
                    }else{
                        next();
                    }
                }
            }
            
        }();
    }
    app.listen = function(){
        let server = http.createServer(app)
        server.listen.apply(server,arguments)
    }
    app.routes = [];
    http.METHODS.forEach((method)=>{
        let m = method.toLowerCase();
        app[m] = function(path,handler){
            app.routes.push({
                method:m,
                path,
                handler
            })
        }
    })
    app.all = function(path,handler){
        app.routes.push({
            method:'all',
            path,handler
        })
    }
    // 中间件的路径只要前缀匹配就可以
    app.use = function(path,handler){
        if(typeof handler != 'function'){
            handler = path;
            path = '/'
        }

        app.routes.push({
            method:'middle',
            path,
            handler
        })

    }
    return app;
}
module.exports = createApplication;