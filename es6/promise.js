function resolvePromise(promise2,x,resolve,reject){
    if(promise2 == x){
        return reject(new TypeError('循环引用'))
    }
    let then,called;
    if(x!=null && (typeof x=='object' || typeof x == 'function')){
        try{
            then = x.then;
            if(typeof then == 'function'){
                then.call(x,function(y){
                    if(called){
                        return;
                    }
                    called = true;
                    resolvePromise(promise2,y,resolve,reject)

                })
            }else{
                resolve(x);
            }
        }catch(e){
            reject(e)
        }
    }else{
        resolve(x)
    }
}
class Promise{
    constructor(fn){
        this.value = null;
        this.status = "pending";
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        this.init(fn);
    }
    init(fn){
        let _self = this;
        function resolve(data){
            if(_self.status == 'panding'){
                _self.value = data;
                _self.status = 'resolved';
                _self.onResolvedCallbacks.forEach((fn)=>{
                    return fn(data)
                })
            }
        }
        function reject(err){
            setTimeout(()=>{
                if(_self.status == 'pending'){
                    _self.value = err;
                    _self.status = 'rejected';
                    _self.onRejectedCallbacks.forEach((fn)=>{
                        return fn(val)
                    })
                }
            })
        }
        try{
            fn(resolve,reject)
        }catch(e){
            reject(e)
        }
    }
    then(resolvedFn,rejectedFn){
        let _self = this;
        resolvedFn = typeof resolvedFn == 'function'?resolvedFn:(value)=>{ return value}
        rejectedFn = typeof rejectedFn == 'function'?rejectedFn:(err)=>{return err}
        let promise2;
        if(_self.status == 'pending'){
            promise2 = new Promise(function(resolve,reject){
                _self.onResolvedCallbacks.push(function(value){
                    try{
                        let x = resolvedFn(value)
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        rejectedFn(e)
                    }
                })
                _self.onRejectedCallbacks.push(function(data){
                    try{
                        let x = rejectedFn(data)
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        rejectedFn(e);
                    }
                })
            })
        }
        if(self.status == 'resolved'){
            promise2 =  new Promise(function(resolve,reject){
                setTimeout(()=>{
                    try{
                        let x = resolvedFn(_self.value)
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        rejectedFn(e)
                    }
                })
            })
        }
        if(_self.status == 'rejected'){
            promise2 = new Promise(function(resolve,reject){
                setTimeout(()=>{
                    try{
                        let x = rejectedFn(_self.value)
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        rejectedFn(e)
                    }
                })
            })
        }
    }
}