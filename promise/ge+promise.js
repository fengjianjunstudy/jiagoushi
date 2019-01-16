const fs = require('fs')
function readFile(url){
    return new Promise(function(resolve,reject){
        fs.readFile(url,'utf8',function(err,data){
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}
function *read(){
    console.log(1)
    let a = yield readFile('./after.js')
    console.log(a)
    let b = yield readFile('./test.js')
    console.log(b)
}
let it = read();
it.next().value.then(function(data){
    it.next(data).value.then(function(d){
        it.next(d)
    })
})