// import Compile from './compile.js'
class MVVM{
    constructor(options = {}){
        this.$options = options;
        this.$data = options.data;
        observe(this.$data);
        this.init(this.$data);
        this.initComputed();
        new Compile(options.el,this);
    }
    /***
     * 数据代理
     */
    init(data){
        let _self = this;
        for(let k in data){
            Object.defineProperty(_self,k,{
                enumerable:true,
                set(newVal){
                    data[k] = newVal;
                },
                get(){
                    return data[k];
                }
            })
        }
    }
    initComputed(){
        let computed = this.$options.computed;
        let keys = Object.keys(computed);
        let _self = this;
        keys.forEach((k)=>{
            Object.defineProperty(this,k,{
                get(){
                    if(typeof computed[k] == 'function'){
                        return computed[k].call(_self);
                    }
                    return computed[k];
                }
            })
        })
    }
    
}
function observe(data){
    if(data && typeof data == 'object' && typeof data != "function"){
        new Observe(data);
    }
}
class Observe{
    constructor(data){
        this.init(data)
    }
    init(data){
        // let dep = new Dep();
        for(let k in data){
            let val = data[k];
            observe(val)
             let dep = new Dep();
            Object.defineProperty(data,k,{
                enumerable:true,
                set(newVal){
                    if(val == newVal){
                        return ;                    
                    }
                    val = newVal;
                    observe(val);
                    dep.notify();
                },
                get(){
                   
                    if(Dep.target){//只有编译模板的时候target 才会有值
                        dep.add(Dep.target);
                    }
                    return val;
                }
            })
        }
    }
}