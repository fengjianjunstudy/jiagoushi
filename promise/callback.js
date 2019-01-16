let fs = require('fs');
fs.readFile('./after.js','utf8',function(err,data){
    if(err){
        return ;
    }
    console.log(data)
})