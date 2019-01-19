let fs = require('fs')
fs.watch('fs/1.txt',function(event,fileName){
    console.log(event,fileName)
})