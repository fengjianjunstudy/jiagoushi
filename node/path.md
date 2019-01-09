###### path
- path.join('./a','./b') path.join(__dirname,'./b')
- path.resolve('./a','../b')
- path.delimiter

###### 流
- 可读流 可写流

```
    let fs = require('fs');
    //默认每次可读流 64k
    let rs = fs.createReadStream('1.txt',{highWaterMark:10})
    let arr = []
    rs.on('data',function(chunk){
        arr.push(chunk)
        rs.pause() //暂停 暂停on('data')的触发
        setTimeout(()=>{
            rs.resume();
        },1000)
    })
    rs.on('end',function(){
        console.log(Buffer.concat(arr).toString())
    })
    rs.on('error',function(err){

    })
    
```

```
    let fs = require('fs');
    //默认可写流 16384 16k
    let ws = fs.createWriteStream('./1.txt');
    // 可写入的必须是字符串或者是Buffer
    // flag 写入的数据是否消费完
    let flag = ws.write('1')
    // 消费完事件
    ws.on('drain',function(){

    })
    // end 之后不可以再write end调用完后会把所有write 中的内容以最快的速度写入文件
    ws.end('结束')

```

```
    let fs = require('fs');

    function pipe(source,target){
        let rs = fs.createReadStream(source,{highWaterMark:4});
        let ws = fs.createWriteStream(target,{highWaterMark:1});
        rs.on("data",function(chunk){
           let flag = ws.write(chunk);
           if(!flag){
               rs.pause();
           }
        })
        ws.on('drain',function(){
            rs.resume();
        })
        rs.on('end',function(chunk){
            ws.end('jieshu')
        })
    }

    function pipe(source,target){
        let rs = fs.createReadStream(source);
        let ws = fs.createWriteStream(targe);
        rs.pipe(ws);
    }

```

###### 事件
- events
- EventEmitter 实例方法 on emit once removeListener  removeAllListeners 
```
    let EventEmitter = require('events')
    class Person extends EventEmitter{

    }
    let {inherits} = require('util');
    function Person(){}
    inherits(Person,EventEmitter)

```

```
    class EventEmitter{
        constructor(){
            this._events = {};
        }
        on(type,fn){
            if(!this._events[type]){
                this._events[type] = [];
            }
            this._events[type].push(fn)
        }
        emit(type,data){
            if(!this._events[type]){
                return;
            }
            this._events.forEach((fn)=>{
                fn.call(this,data);
            })

        }
        removeListener(type,fn){
            if(!this._events[type]){
                this._events = this._events.filter((f)=>{
                    return f == fn;
                })
            }
        }
        removeAllListeners(type){
            if(this._events[type]){
                return;
            }
            this._events[type] = [];
        }
        once(type,fn){
            let f = (data) =>{
                callback(data);
                this.removeListener(type,f)
            }
            this.on(type,f);
        }
    }
```