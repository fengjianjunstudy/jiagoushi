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
rmdir('fs')