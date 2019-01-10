##### http 
- 半双工协议 同一时刻数据只能单向流动 
- 服务器不能主动推送数据到浏览器
##### 双向通信
- 轮询 ：浏览器定时向服务器发起请求，要求服务器很快的处理速度
- 长轮询：服务器主动向客户端发送数据的最常见的方式之一，通过长轮询，客户端打开了一个服务端的HTTP连接，直到返回响应数据，当服务端有新数据需要发送时，它会把新数据作为响应发送给客服端，客服端收到数据再发起请求

- websocket :全双工 socket连接，持久连接，两边都可以在任意时间发送数据，属于应用层协议，基于TCP传输协议，并复用HTTP的握手通道
> 优势：<br>
    1 双向通信 实时性强 <br> 
    2 支持二进制 <br>
    3 较少的控制开销，连接创建后，ws客服端、服务器进行数据交换时，协议控制的数据包头部较小
```
    //服务器端
    let WSServer = require('ws').Server;
    let wsServer = new WSServer({port:8888})
    //监听客服端的链接
    //socket 每个用户连接服务器之后，都会创建唯一的socket
    wsServer.on('connection',function(socket){
        // 监听客户端发过来的数据
        socket.on('message',function(msg){
            //向客服端推送消息
            socket.send('hello')

        })

    })

    // 客服端
    let ws = new WebSocket('ws://localhost:8888')
    ws.onopen = function(){
        console.log('链接成功')
    }
    ws.onmessage = function(msg){
        ws.send('hello server')
    }
    ws.onerror = function(err){

    }
```