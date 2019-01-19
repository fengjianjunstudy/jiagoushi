let createApplication = require('./mock_express')
let app = createApplication();
app.use(function(req,res,next){
    console.log('无路径的中间件')
    next();
})
//next 传入参数是表示发生错了，express 会跳过所有的中间件和路由，会交给错误中间件处理
app.use('/hello',function(req,res,next){
    console.log('有路径的中间件')
    next();
})
app.get('/hello',function(req,res){
    res.end('hello')
})
app.use(function(err,req,res,next){
    console.log('错误中间件')
})
app.listen(8088,function(){
    console.log('服务器已经启动')
})