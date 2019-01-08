###### aysnc and await
```
    async function result(){
        let content1 = await read('./1.txt','utf8');
        let content2 = await read(content1,'utf8');
        console.log(content2)
    }

    Promise.all([p1,p2]).then((dataList = []) =>{

    }).catch(function(){

    })

    async function  result (){
        let [name,age] = await Promise.all([p1,p2]);
        console.log(name,age)
    }
```


###### Promise 
- Promise.all 全部成功才算成功
- Promise.race 只要有一个成功就算成功
```
    let fs = require('fs');
    let {promisify} = require('util');
    let read = promisify(fs.readFile);
    Promise.race([read('1.txt','utf8'),read('2.txt','utf8')]).then((data) => {
        console.log(data);
    })
```
- Promise.resolve
- Promise.reject

###### 写文件
- writeFile 文件不存在会自动创建  如果已经存在会被覆盖
```
    fs.writeFile(path,data,options,callback)
```

###### 拷贝文件
```
    // 同步 readFileSync and writeFileSync
    function copyFile(source,target){
        let readData = fs.readFileSync(source);
        fs.writeFileSync(target,readData);
    }
    //异步 readFile writeFile
    // 追加 appendFile
    function copyFile(source,target,callback){
        fs.readFile(source,'utf8',function(err,data){
            if(err){
                return callback(err);
            }
            fs.write(target,data,callback)
        })
    }
```
###### 文件状态
```
    //fs.stat(path,callback)
    fs.stat('/',function(err,stats){
        if(err){//文件不存在
            return ;
        }
        // stats(属性： atime mtime ctime birthtime  方法: isFile() isDirectory())

    })
```

###### 创建目录
```
    fs.mkdir('a/b/c',function(err){

    })
    function makeP(pathStr,callback){
        let pathArr = pathStr.split('/');
        let length = 0;
        function make(url){
            if(index >= pathArr.length){
                return ;
            }
            fs.stat(url,function(err){
                if(err){
                    fs.mkdir(url,function(err){
                        if(err){
                            return ;
                        }
                        make(pathArr.slice(0,++length+1).join('/'))
                    })
                }else{
                    make(pathArr.slice(0,++length+1).join('/'))
                }
            })
        }
        make(pathArr.slice(0,length+1).join('/'))
    }
    makeP('a/b/c')
```