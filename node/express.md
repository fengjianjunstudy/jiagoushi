##### express
- 路由控制
- 参数获取
- 中间件
- send sendFile
- 静态文件服务
- 模板解析
- 重定向

```
    function app(){

    }
    app.middlewares = [];
    app.use = function(cb){
        this.middlewares.push(cb)
    }
    let index = 0;
    function next(){
        app.middlewares[index++](null,null,next);
    }
    next();
```