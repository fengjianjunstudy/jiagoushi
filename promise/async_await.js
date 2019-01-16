const fs = require('fs');
function readFile(url){
    return new Promise(function(resolve,reject){
        fs.readFile(url,'utf8',function(err,data){
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}
async function read(){
    let a = await readFile('./test.js')
    console.log(a)
}
console.log('start')
read();
console.log('end')