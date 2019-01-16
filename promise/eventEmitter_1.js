let EventEmitter = require('events');
let fs = require('fs');

function render(length,cb){
    let html = {};
    return function(key,value){
        html[key] = value;
        if(Object.keys(html).length == length){
            cb(html);
        }
    }
}

let done = render(2,function(value){
    console.log(value)
})

fs.readFile('./isType.js','utf8',function(err,data){
    done('template',data)
})
fs.readFile('./callback.js','utf8',function(err,data){
    done('data',data)
})