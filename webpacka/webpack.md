##### webpack
> 模块打包机，分析项目结构，找到javascript模块以及其他的一些浏览器不能直接运行的拓展语言（less ts）,将其打包为在浏览器中可以使用的格式

> 构建： 把源码转换成发布到线上的可执行javascript css html 工程化 自动化

- 代码转化
- 文件优化 ： 压缩 合并
- 代码分割： 提取多个页面的公共代码，提取首屏不需要执行部分的代码让其异步加载
- 模块合并 ：
- 自动刷新
- 代码校验
- 自动发布

##### webpack 工作流程
> 1 根据entry 配置 开始递归解析依赖的所有module<br>
  2 每找到一个模块就会根据loader的配置去找对应的转换规则<br>
  3 module转换后 再解析出当前module 依赖的module<br>
  4 这些模块会以entry为单位进行分组，一个entry 和 其所依赖的module被分到一个组(chunk)<br>
  5 把所有的Chunk转化成文件输出，在整个流程中webpack会在恰当的时机执行plugin里面定义的逻辑
##### entry
> 1 字符串 2 数组 3 多入口对象形式
##### loader
> 1 字符串 2 数组 3 use：{loader：'',options:'$'}

##### loader
- css-loader
- style-loader
- url-loader
- less less-loader node-sass sass-loader
- postcss-loader autoprefixer
- babel-loader babel-core babel-preset-env babel-preset-stage-0 babel-preset-react
- html-withimg-loader

##### plugins
- clean-webpack-plugin
- html-webpack-plugin
- extract-text-webpack-plugin
> 把css文件单独保存加载
- copy-webpack-plugin
- uglifyjs-webpack-plugin

##### webpack 优化
###### 减少打包时间 
- 优化loader 
> 1 优化文件的搜索范围 <br>
  2 编译过的文件缓存
```
    loader:'babel-loader?cacheDirectory=true'
```
- happyPack
> 将loader的同步执行转换为并行
```
    module:{
        loaders:[
            {
                test:/\.js$/,
                include:[resolve('src')],
                exclude:'/node_modules/',
                loader:'happypack?loader?id=happybabel'
            }
        ]
    },
    plugins:[
        new HappyPack({
            id:'happybabel',
            loaders:['babel-loader?cacheDirectory'],
            threads:6 //6个线程
        })
    ]
```
- DLLPlugin 
> 特定类库提前打包然后引入
- resolve.extensions resolve.alias module.noParse

###### 减少打包体积
- 按需加载
- scope hoisting 分析模块间的依赖关系，尽量将多个模块合并到同一个函数中
- tree shaking 删除代码中未被引用到的代码