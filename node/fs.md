##### fs
###### fs.readFile
```
    let fs = require('fs');
    fs.readFile('./http.md',{encoding:'urf8'},function(err,data){
        if(err){

        }
    })
```
###### fs.writeFile
```
    //mode 权限
    fs.writeFile('./fs.js','let a =1',{encoding:'utf8',flag:'a',mode:0o666},function(err){

    })
```
###### fs.appendFile
```//追加 相当于writeFile {flag:'a'}
    fs.appendFile('./fs.js','let b = 1',function(err){

    })
```
###### fs.open
```
    fs.open('./fs.js','r',0o666,function(err,fd){
        //fd file dispcriptor 文件描述符
        // 0 标准输入
        // 1 标准输出
        // 2 错误输出
        let buffer = Buffer.alloc(3)
        //read write 精确的读出和写入
        fs.read(fd,buffer,0,3,0,function(err,bytesRead){

        })
        fs.write(fd,Buffer.from('冯建俊'),3,3,0,function(err,bytesWritten){

        })
    })
```