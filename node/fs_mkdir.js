let fs = require('fs');
// fs.mkdir('fs',function(err){
//     console.log(err)
// })
function mkdirP(path){
    let pathArr = path.split('/');
    let length = 0;
    !function next(){
        if(length>= pathArr.length){
            return;
        }
        let p = pathArr.slice(0,length+1).join('/');
        console.log(p)
        fs.access(p,fs.constants.F_OK,(err) =>{
            console.log('aa')
            if(err){
                fs.mkdir(p,(err)=>{
                    if(err){
                        console.log(err)
                    }else{
                        length++;
                        next();
                        
                    }
                })
                
            }else{
                length++;
                next()
            }
        })
    }()
}
mkdirP('fs/a/b')