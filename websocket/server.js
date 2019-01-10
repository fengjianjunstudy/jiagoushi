const express = require('express');

const app = express();
const path = require('path')

app.use(express.static(path.resolve('public')))
const server = require('http').createServer(app)

let io = require('socket.io')(server)
io.on('connection',function(socket){
    socket.on('message',function(message){
        console.log(message);
        socket.send('server:'+message)
    })
})
server.listen(8080,function(){
    console.log('建立服务')
})