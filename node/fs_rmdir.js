const fs = require('fs')
let filesCountObj ={

}
function rmdir(path){
    fs.readdir(path,function(err,files){
        filesCountObj[path] = files.length;
        if(err){
            console.log(err)
        }
        if(files.length == 0){
            fs.rmdir(path,function(err){
                if(err){
                    console.log(err);
                }
                let pArr = path.split('/')
                let parentPath = pArr.length > 1?pArr.slice(0,pArr.length-1).join('/'):null
                if(parentPath && --filesCountObj[parentPath] == 0){
                    rmdir(parentPath)
                }
                
            })
            return;
        }
        files.forEach((file)=>{
            let p = `${path}/${file}`
            fs.stat(p,(err,stats)=>{
                if(stats.isDirectory()){
                    rmdir(p)
                }else{
                    fs.unlink(p,(err) =>{
                        filesCountObj[path]--;
                        if(filesCountObj[path] == 0){
                            rmdir(path)
                        }
                        console.log(err)
                    })
                }
            })
        })
    })

}
// rmdir('fs')
const path = require('path')
function rmdirPromise(dir){
    return new Promise(function(resolve,reject){
        fs.stat(dir,(err,stats) => {
            if(err){
               return reject(err)
            }
            if(stats.isDirectory()){
                fs.readdir(dir,(err,files)=>{
                    if(err){
                        return reject(err);
                    }
                    Promise.all(files.map((item)=>{
                        return rmdirPromise(path.join(dir,item))
                    })).then(()=>{
                        console.log('dir',dir)
                        fs.rmdir(dir,resolve);
                    })
                })
            }else{
                fs.unlink(dir,resolve)
            }
        })
    })
}
rmdirPromise('fs').then(()=>{
    console.log('删除成功')
})