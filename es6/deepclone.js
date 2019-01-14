function isObject(val){
    return val && typeof val == ''
}
function deepClone(obj){
    let newObj = {};
    let keys = Object.keys(obj);
    keys.forEach((key)=>{
        if(typeof obj[key] == 'object'){
            newObj[key]= deepClone(obj[key])
        }else{
            newObj[key]= obj[key]
        }
    })
    return newObj;
}