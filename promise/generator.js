function *go(){
    console.log(1);
    let b = yield 'a';
    console.log(2);
    let c = yield 'b';
    console.log(3);
    return c;

}
for(let val of go()){
    console.log(val)
}