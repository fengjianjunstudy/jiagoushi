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