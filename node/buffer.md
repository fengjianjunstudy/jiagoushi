##### buffer
-  字节 1k = 1024b = 1024*8bit
- 一个汉字 3个字节
###### 创建方法：
- 长度创建 Buffer.alloc(100,2) 耗性能  Buffer.allocUnsafe(100) 
- 数组创建  Buffer.from([1,2,3])
- 字符串创建 Buffer.from('冯建俊')

###### buffer 转化为字符串
- buffer.toString()

###### buffer 方法
- fill(值，开始索引，结束索引)
- write(值,开始索引,长度,编码)
- slice 截取、克隆 浅拷贝
- copy
```
    var buf1 = Buffer.from('冯')
    var buf2 = Buffer.from('建俊')
    var buf = Buffer.alloc(9)
    buf1.copy(buf,0)
    buf2.copy(buf,3)
```
- Buffer.concat
```
 Buffer.myConcat = function(list=[],totalLength){
     if(typeof totalLength === 'undefined'){
         totalLength = list.reduce((prev,next)=>{ return prev+next.length},0)
     }
     var buffer = Buffer.alloc(totalLenght);
     var offset = 0;
     list.forEach((buff)=>{
         buff.copy(buffer,offset);
         offset = offset + buff.length;
     })
    return buffer.slice(0,offset)
 }
```
- Buffer.isBuffer 

###### 进制转化
- base64
```
    var buffer = Buffer.from('冯')
    console.log(buffer.toString('base64'))
```
##### string_decoder
> 解决乱码
> write的时候会判断是不是一个字符，如果是怎输出，如果不是则缓存在对象内部，等待下次write的时候会把前面缓存的字符加到第二次write的buffer上再进行判断