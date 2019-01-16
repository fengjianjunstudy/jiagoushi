function co(gen){
    let it = gen();
    return new Promise(function(resolve,reject){
        !function next(lastVal){
            let {value,done} = it.next(lastVal);
            if(done){
                resolve(value);
            }else{
                value.then(next,reject)
            }
        }()
    })
}
