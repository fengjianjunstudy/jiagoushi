let MyPromise = require('./Promise')
let p1 = new MyPromise(function(resolve,reject){
    setTimeout(function(){
        resolve('abc')
    },1000)
})
p1.then(function(val){
    console.log(val)
})