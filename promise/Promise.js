const PENDING = 'pending',FULFILLED = 'fulfilled',REJECTED = 'rejected';
class Promise{
    constructor(excutor){
        this.status = PENDING;
        this.onResolveCallbacks = [];
        this.onRejectedCallbacks = []
        this.value = null;
        this.init(excutor);
    }
    init(excutor){
        let _self = this;
        function resolve(value){
            if(_self.status == PENDING){
                _self.status = FULFILLED;
                _self.value = value;
                _self.onResolveCallbacks.forEach((cb)=>{
                    return cb(value)
                })
            }
        }
        function reject(reason){
            if(_self.status == REJECTED){
                _self.status = REJECTED;
                _self.value = reason;
                _self.onRejectedCallbacks.forEach((cb)=>{
                    return cb(reason)
                })
            }
            console.log(reason)
        }
        try{
            excutor(resolve,reject)
        }catch(e){

        }
    }
    then(onResolvedFn,onRejectedFn){
        let _self = this;
        let p2;
        onResolvedFn = typeof onResolvedFn == 'function'?onResolvedFn:(val)=>{return val}
        onRejectedFn = typeof onRejectedFn == 'function'?onRejectedFn:(reason)=>{throw reason}
        if(_self.status == PENDING){
            p2 = new Promise(function(resolve,reject){
                _self.onResolveCallbacks.push(function(){
                    let x = onResolvedFn(_self.value)
                    resolvePromise(p2,x,resolve,reject)
                })
                _self.onRejectedCallbacks.push(function(){
                    let x = onRejectedFn(_self.value)
                    resolvePromise(p2,x,resolve,reject)
                })
            })
            
        }
        if(_self.status == FULFILLED){
            return  p2 = new Promise(function(resolve,reject){
                try{
                    let x = onResolvedFn(_self.value);
                    resolvePromise(p2,x,resolve,reject);
                }catch(e){
                    reject(e)
                }
            })
        }
        if(_self.status == REJECTED){
            return p2 = new Promise(function(resolve,reject){
                try{
                    let x = onRejectedFn(_self.value);
                    resolvePromise(p2,x,resolve,reject)
                }catch(e){
                    reject(e)
                }
            })
        }
    }
    catch(onRejectedFn){
        this.then(null,onRejectedFn);
    }
    static deferred(){
        let defer = {}
        defer.promise = new Promise(function(resolve,reject){
            defer.resolve = resolve;
            defer.reject = reject;
        })
        return defer;
    }
    static all(promiseArr){
        return new Promise(function(resolve,reject){
            function gen(num,cb){
                let count = 0;
                let result = [];
                return function(data,i){
                    count++;
                    result[i] = data;
                    if(count == num){
                        cb(result);
                    }
                }
            }
            let done = gen(promiseArr.length,resolve)
            for(let i = 0;i<promiseArr.length;i++){
                promiseArr.then(function(data){
                    done(data,i)
                },reject)
            }
        })
    }
    static race(promiseArr){
        return new Promise(function(resolve,reject){
            promiseArr.forEach((p) =>{
                p.then(function(data){
                    resolve(data);
                },function(err){
                    reject(err)
                })
            })
        })
    }
}
function resolvePromise(p2,x,resolve,reject){
    if(p2 == x){
        throw new TypeError('')
    }
    let called = false;
    if(x instanceof Promise){
        if(x.status == PENDING){
            x.then(function(y){
                resolvePromise(p2,y,resolve,reject)
            },reject)
        }else{
            x.then(resolve,reject)
        }
    }else if(x && (typeof x  == 'object' || typeof x == 'function')){
        try{
            let then = x.then;
            if(typeof then == 'function'){
                then.call(x,function(y){
                    if(called) return;
                    called = true;
                    resolvePromise(p2,y,resove,reject)
                },function(err){
                    if(called) return;
                    called = true;
                    reject(err)
                })
            }else{
                resolve(x);
            }
        }catch(e){
            if(called) return ;
            called = true;
            reject(eval)
        }
    }else{
        resolve(x);
    }
}
module.exports = Promise