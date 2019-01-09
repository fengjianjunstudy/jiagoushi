let express = require('express');

//返回时http的监听函数
let app = express();
app.listen(8080,function(){
    console.log('start')
})
// app.get('/user',function(req,res){
//     let {id} = req.query;
//     let {url,path,headers,method} = req;
// })

//中间件 1权限判断 2对req res属性扩展 3 中间件装饰者
app.use('/',function(req,res,next){
    console.log('处理1')
    let end = res.end;
    res.end = function(...args){
        //装饰代码
        //...
        end.call(res,...args);
    }
    next();
})

app.use(function(req,res,next){
    console.log('处理2')
    next()
})


//id name  占位符 req.params
app.get('/user/:id/:name',function(req,res){
    let {id,name} = req.params;
    console.log(id,name)

})
app.post('/user',function(req,res){

})
app.all('*',function(req,res){
    res.end('404')
})

//错误中间件
app.use(function(err,req,res,next){

})