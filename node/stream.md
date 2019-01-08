###### fs 文件的读写
- 同步 
```
    let fs = require('fs')
    //读取文件 文件必须存在，否则报错
    //读取的默认类型就是buffer
    let result = fs.readFileSync(path,options)
```

- 异步 容易回调地狱 不容易维护 

```
    fs.readFile(path,'utf8',function(err,data){
        if(err){
            return ;
        }
        fs.readFile(data,'utf8',function(err,data){
            .....
        })
    })
```

- promise 解决回调地狱
```
    let util  = require('util');
    let fs = require('fs')
    let read = util.promisify(fs.readFile)
    read('./1.txt','utf8').then(function(data){
        return read(data,'utf8')
    }).then((data)=>{
        console.log(data)
    }).catch(function(err){

    })
```