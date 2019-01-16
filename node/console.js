console.time('test')
let i = 0;
while(i<10){
    console.log(i++)
}
console.timeEnd('test')
function sum(a,b){
    return a+b
}

console.assert(sum(1,2)==3,'错误')
// console.log(global)
console.trace()
function one(){
    console.log('one');
    let a = 0;
    two()
    function two(){
        console.log('two')
        console.log(a)
        let b = 1
        three();
        function three(){
            console.log('three')
            console.log(b)
        }
    }
    
}
one();
