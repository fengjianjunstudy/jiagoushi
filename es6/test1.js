let name = 'fjj',age=18
let str = '${name},${age}'
function replace(str){
    return str.replace(/\$\{([^}]+)\}/g,function(matches,key){
        console.log(arguments);
        return eval(key)

    })
}
console.log(replace(str))
