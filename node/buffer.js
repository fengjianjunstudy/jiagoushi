let b1 = Buffer.alloc(6,2)
console.log(b1)
let name = Buffer.from('冯建俊')
console.log(name)

let b2 = Buffer.alloc(4);
//
b2.fill(3,1,3)
console.log(b2)
let {StringDecoder} = require('string_decoder')
let sd = new StringDecoder();
console.log(sd.write(name.slice(0,4)))
console.log(sd.write(name.slice(4)))
