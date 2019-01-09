##### restful 接口风格
- methods  GET POST PUT DELETE OPTIONS
```
    let http = require('http')
    let url = require('url')
    let users = [{id:1,userName:'11',password:10}]
    let server = http.createServer(function(req,res){
        let {pathname,query} = url.parse(req.url,true);
        if(pathname == '/user'){
            let method = req.method;
            let id = query.id;
            res.setHeader('Content-Type','application/json;charset=utf8')
            res.setHeader('Access-Control-Allow-Origin','*')
            res.setHeader('Access-Control-Allow-methods','GET,POST,PUT,DELETE')
            switch(method){
                case 'POST':
                    let arr =[];
                    req.on('data',function(chunk){
                        arr.push(chunk)
                    })
                    req.on('end',function(){
                        let user = JSON.parse(Buffer.concat(arr).toString());
                        user.id  = users.length?users[user.length-1].id+1:1;
                        users.push(user);
                        res.end(JSON.stringify(user));
                    })
                    break;
                case 'GET':
                    if(!id){ //没有ID查询所有
                        res.end(JSON.stringify(users))
                    }else{
                        let user;
                        users.forEach((u) =>{
                            if(u.id == id){
                                user = u;
                            }
                        })
                        res.end(user);
                    }
                    break;
                case 'DELETE':
                    if(!id){
                        users = [];
                    }else{
                        users = users.filter((user) =>}{
                            return user.id != id;
                        })
                    }
                    break;
                case 'PUT':
                    ...
                    break;
            }
        }
    })
    server.listen('3000',function(){
        console.log('建立服务')
    })
```