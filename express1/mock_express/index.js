let http  = require('http')
let url = require('url');
function createApplication(){
    let app = function(req,res){
        let {pathname} = url.parse(req.url,true) 
        let index = 0;
        !function next(err){
            if(index >= app.routes.length){
                res.end(`cannot ${req.method} ${pathname}`)
                return ;
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
                    if(route.paramsNames && route.paramsNames.length>0){
                        let matchers = pathname.match(route.path);
                        if(matchers){
                            let params = {}
                            for(let i=0;i<route.paramsNames.length;i++){
                                params[route.paramsNames[i]] = matchers[i+1];
                            }
                            req.params = params;
                            route.handler(req,res)
                        }else{
                            next()
                        }
                    }
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
           let layer = {method:m,path,handler}
           console.log(path)
            if(path.indexOf(':') > -1){
                let paramsNames = [];
                path = path.replace(/:([^\/]+)/g,function(){
                    paramsNames.push(arguments[1]);
                    return '([^\/]+)'
                })
                layer.path = path;
                layer.paramsNames = paramsNames;
            }
             app.routes.push(layer)
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
    //内置中间件，用来为请求和响应对象添加方法和属性
    app.use(function(req,res,next){
        const urlObj = url.parse(req.url,true)
        req.query = urlObj.query;
        req.path = urlObj.pathname;
        req.hostname = req.headers['host'].split(':')[0];
        
        next()
    })
    return app;
}
module.exports = createApplication;