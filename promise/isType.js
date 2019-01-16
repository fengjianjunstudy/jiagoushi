function isType(type){
    return function (val){
        return Object.prototype.toString.call(val) == `[object ${type}]`
    }
}
let isString = isType('String')
let isArray = isType('Array')

let arr = [1]
console.log(isArray(arr))