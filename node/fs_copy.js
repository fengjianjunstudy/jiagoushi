const fs = require('fs');
const BUFFER_SIZE = 3
function copy(source,target){
    fs.open(source,'r',0666,function(err,readFd){
        if(err){
            console.log('read',err)
        }
        fs.open(target,'w',0666,function(err,writeFd){
            if(err){
                console.log('write',err)
            }
            !function next(){
                let buff = Buffer.alloc(BUFFER_SIZE);
                fs.read(readFd,buff,0,BUFFER_SIZE,null,function(err,bytesRead,b){
                    if(err){
                        console.log(err)
                    }
                    if(!bytesRead){
                        return;
                    }
                    fs.write(writeFd,buff,0,bytesRead,null,next)
                })
            }()
            
        })
    })
}
copy('fs_test_1.txt','fs_test_2.txt')