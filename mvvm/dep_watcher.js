class Dep{
    constructor(){
        this.subs = [];
    }
    add(watcher){
        this.subs.push(watcher);
    }
    notify(){
        this.subs.forEach((watcher)=>{
            watcher.update();
        })
    }
}

class Watcher{
    constructor(vm,exp,fn){
        let arr = exp.split('.');
        let val = vm;
        this.vm = vm;
        this.exp = exp;
        Dep.target = this;
        arr.forEach((k)=>{
           val = val[k];
        })
        Dep.target = null;
        this.fn = fn;
    }
    update(){
        let arr = this.exp.split('.');
        let val = this.vm;
        arr.forEach((k) => {
            val = val[k];
        })
        this.fn(val);
    }
}