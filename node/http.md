##### http
- 路由 根据不同的路径返回不同的内容
``` 
    //Request

    POST /index.html HTTP/1.1
    Host:fjj.com
    Connection:keep-alive
    Content-Type:application/x-www-form-urlencoded
    Content-Length:100

    name=fjj&age=18

    //Response
    HTTP/1.1 200 OK
    Date:
    Content-Length:300
    Content-type:text/html

    <html>
    ...
    </html>

```

- 请求
> 1 浏览器向服务器发送请求 <br>
  2 域名解析为IP （浏览器缓存->操作系统缓存-> 本地host -> DNS系统 -> 运营商DNS缓存）<br>
  3 客服端通过随机端口向服务器发起TCP三次握手，建立TCP链接<br>
  4 链接建立后发送HTTP请求<br>
  5 服务器收到请求 解析路径和参数 返回处理结果
- 响应
> 1 客服端收到服务器响应结果（html）,对html代码解析<br>
  2 解析的过程中遇到引用服务器的资源 再向服务器发送请求<br>
  3 CSS 生成 CSSOM + html 解析成DOM树  = redener function 



```
    let http = require('http');
    let fs = require('fs');
    let path = require('path')
    let url = require('url'); //把路径解析为对象
    let server =http.createServer(function(req,res){
        //路径处理
        let {pathname,query} = url.parse(req.url,true)
        
        //访问/ 返回index.html
        //访问文件 返回文件
        //访问文件夹 返回文件夹下的index.html
        //否则 404
        fs.stat(path.join(__dirname,pathname),function(err,stats){
            if(err){
                res.statusCode = 404;
                res.end('文件没有找到');
            }else if(stats.isFile()){
                let rs = fs.createReadStream(path.join(_dirname,pathname));
                rs.pipe(res);
                res.end();
            }else if(stats.isDirectory()){
                fs.createReadStream(path.join(__dirname,pathname,'index.html')).pipe(res);
                res.end();
            }
        })


        //res.setHeader('Content-Type','text/plain;charset=utf8')
        let 
        //res.write('hello word');
        //res.end();
        res.setHeader('Content-Type','text/html;charset=utf-8')
        fs.readFile('index.html','utf8',function(data){
            res.end(data)
        })


        let rs = fs.createReadStream('index.html');
        rs.pipe(res);
    })
    server.listen(3000,function(){
        console.log('建立服务')

    })

```

```
    
```