let obj1 = {
    name:'123',
    getName:()=>{
        console.log(this.name)  //this指向外面
    }
}
obj1.getName()
let obj2 = {
    name:'fjj',
    getN:obj1.getName
}
obj2.getN()