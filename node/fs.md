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
        
    })
    fs.open('./fs.js','w',0x666,function(err,fd){
        fs.write(fd,Buffer.from('冯建俊'),3,3,0,function(err,bytesWritten){
            //强行的把缓存区的数据写入文件，并且关闭
            fs.fsync(fd,function(err){
                fs.close(function(){
                    console.log('关闭')
                })
            })
        })
    })
```
##### 创建目录
```
    fs.mkdir('fs',function(err){

    })
    fs.access('a',fs.constants.R_OK,function(err){
        if(err){
            console.log(err)
        }
    })

    //递归异步创建目录
    function mkdirP(path){
        let pathArr = path.split('/');
        let length = 0;
        !function next(){
            let path = pathArr.slice(0,length+1)
            fs.access(path,fs.constants.F_ok,(err) => {
                if(err){
                    fs.mkdir(path,(err)=>{
                        if(err){
                            console.log(err);
                        }
                    })
                }
                length++;
                next();
            })
        }()
    }
```