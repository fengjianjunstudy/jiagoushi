const fs = require('fs')
const path = require('path');
//深度先序遍历
function preDeep(dir,callback){
    console.log(dir)
    fs.readdir(dir,(err,files) =>{
        if(err){
            console.log(err)
            return ;
        }
        !function next(i){
            if(i>=files.length){
                callback();
                return ;
            }
            let p = path.join(dir,files[i]);
            fs.stat(p,(err,stats)=>{
                if(stats.isDirectory()){
                    preDeep(p,()=>{next(i+1)})
                }else{
                    console.log(p)
                    next(i+1);
                }
            })
        }(0)
    })

}
// preDeep('fs',()=>{
//     console.log('打印完毕')
// })

//广度先序遍历
function preWide(dir,callback){
    console.log(dir)
    let arrDirs = [dir];
    !function next(){
        if(arrDirs.length == 0){
            callback();
            return ;
        }
        let p1 = arrDirs.shift();
        fs.readdir(p1,(err,files)=>{
            !function n(i){
                if(i >= files.length){
                    next();
                    return ;
                }
                let p = path.join(p1,files[i]);
                fs.stat(p,(err,stats)=>{
                    if(stats.isDirectory()){
                        arrDirs.push(p);
                    }
                    console.log(p);
                    n(++i)
                })
            }(0)
        })
    }()
}
preWide('fs',()=>{
    console.log('遍历完毕')
})