const express = require('./lib/express')
const app = express();

app.get('/',function(req,res){
    res.end('hello')
})
//路径分组
// restful 风格的API接口
//相同路径的接口只匹配一次
// stack 栈 
// layer 层 
app.route('/user')
    .get(function(req,res){

    })
    .post(function(req,res){

    })
app.listen(8080,function(){
    console.log('启动服务')
})
