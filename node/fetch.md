##### XMLHttpRequest
```
    let xhr = new XMLHttpRequest();
    xhr.open('get','/a',true)
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.state == 200){
            console.log(xhr.responseText)
        }
    }
    xhr.send()
```
##### fetch
- 返回Promise
- 获取返回数据  then函数的参数res 
> 1 res.status 100~599 <br>
  2 res.ok 
  3 res.headers
  4 res.body.text()
  5 res.body.json()
  6 res.body.blob()
  7 res.body.arrayBuffer()
  8 res.body.formData()
- 优点
> 1 语法简洁，更加语义化
  2 基于promise,支持async/await
  3 同构方便
- 缺点：
> 1 兼容性
  2 默认不会带cookie，传递Cookie 必须在header参数里面加credentials:'include'
  3 没有abort方法
  4 服务器返回4xx 5xx 不会抛出错误，需要手动通过ok和status来判断，只有网络错误才会导致请求不能完成
```
    fetch('/a',{
        method:'POST',
        body:'',
        headers:{},
        credentials:'omit/same-origin/include'
    }).then(function(response){
        console.log(res);
    })
```
##### aysnc await
```
    aysnc function getData(url){
       let res =  await fetch(url);
       let data = res.json();
       console.log(data)
    }
```