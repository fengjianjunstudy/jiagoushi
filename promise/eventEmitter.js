let EventEmitter = require('events');
let fs = require('fs');

let eve = new EventEmitter();
let dataObj = {}
eve.on('ready',function(key,value){
    dataObj[key] = value;
    // dataObj.length++;
    if(Object.keys(dataObj).length == 2){
        console.log(dataObj)
    }
    
})
fs.readFile('./after.js','utf8',function(err,data){
    eve.emit('ready','template',data)
})
fs.readFile('./isType.js','utf8',function(err,data){
    eve.emit('ready','data',data)
})

