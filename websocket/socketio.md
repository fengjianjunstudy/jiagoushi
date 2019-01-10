##### socket.io 
> 包括了客户端和服务器端,可以在不同浏览器和移动设备上使用的实时应用
##### socket.io 的特点
- 易用性：封装了服务器和客户端
- 跨平台
- 自适应：会自动根据浏览器从websocket ajax长轮询，iframe流 等等各种方式中选择最佳的方式来实现网络实时应用

##### socket.io 服务器端划分命名空间
```
    //默认命名空间 /
    io.of('/')

    io.of('/chat')
    //向所有的广播
    io.emit('message')
    //向除了自己的广播
    socket.bordercast.emit
    
```

##### socket.io 客服端划分命名空间
```
    let socket = io()

    let socket = io('/chat')

```

##### 房间
```
    //服务器
    socket.on('xxx',function(roomName){
        socket.join(name)
    })
    socket.on('YYY',function(roomName){
        socket.leave(roomName)
    })
    io.of('/chat').in(roomName).emit

    //客服端
    //进入房间
    socket.emit('xxx',roomName)
    //离开房间
    socket.emit('YYY',roomName)
```
