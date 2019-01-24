function after(num,fn){
    let i = 0;
    return function(...rest){
        if(++i >= num){
            fn.apply(null,rest)
        }
    }
}
function eat(name){
    console.log(name+' eat')
}
let newFn = af
ter(3,eat)
newFn('xiaohei')
newFn('xiaohua')
newFn('xiaoming')