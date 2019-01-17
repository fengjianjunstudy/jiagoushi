##### global 
> 全局变量
###### process
- chdir 改变当前的工作目录
- cwd 当前的工作目录
- memoryUsage //内存使用量
```
    console.log(process.cwd())
    process.chdir('...')
```
- nextTick
> nextTick setImmediate 的区别
> nextTick ： 把回调函数放在微任务的队列中
> setImmediate : 把回调函数放在任务队列的尾部
###### argv
###### pid
###### env
###### nextTick
###### stdout
###### clearInterval
###### buffer