##### 二进制
- 进制转换
```
    //十进制20 各种进制表示
    //二进制
    let a = 0b10010;
    //八进制
    let b = 0o24
    //十六进制
    let c = 0x14;
    //任意进制转为十进制
    console.log(parseInt(a,2))
    console.log(parseInt(b,8))
    console.log(parseInt(c,16))
    //十进制转为任意进制
    console.log(20.toString(2))
    console.log(20.toString(8))
    console.log(20.toString(16))
```
##### ASCII
##### 如何把一个unicode转换成utf8
```
    // 万 4E07
    function transfor(num){
        let arr = ['110','10','10']
        let str = num.toString(2);
        arr[2] += str.substring(str.length-6)
        arr[1] += str.substring(str.length-12,str.length-6)
        arr[0] += str.substring(0,str.length-12).padStart(4,'0')

        return arr.map((item)=>{return parseInt(item,2).toString(16)})
    }
    let r = transfor(0x4E07)
```
