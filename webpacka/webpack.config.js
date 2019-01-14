const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const webpack = require('webpack')

let cssExtract = new ExtractTextWebpackPlugin('css.css');
let lessExtract = new ExtractTextWebpackPlugin('less.css')
let sassExtract = new ExtractTextWebpackPlugin('sass.css')
module.exports = {
    //1 字符串 2 数组 3多入口，对象形式
    "entry":{
        main:'./src/index.js',
        base:'./src/base.js',
        common:'./src/common.js'
    },
    output:{
        path:path.join(__dirname,'dist'),
        filename:'[name].[hash].js'
    },
    //监控源文件的变化，当源文件发生改变后重新打包
    watch:true,
    watchOptions:{
        ignored:'node-modules',
        poll:1000,
        aggregateTimeout:500
    },
    resolve:{
        //别名
        alias:{
            "bootstrap":"bootstrap/dist/css/bootstrap.css"
        },
        //扩展名
        extensions:['.js','.less','.json']
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                //css-loader 解析处理css文件中的url路径
                //style-loader css 文件变成style标签插入head
                //多个loader 转换顺序从右向左
                loader:cssExtract.extract({
                    use:['css-loader','postcss-loader']
                })
            },{
                test:/\.(png|jpg|gif|svg|bmp)$/,
                use:{
                    loader:'file-loader',
                    //拷贝文件的输出目录
                    options:{
                        limit:9*1024,
                        outputPath:'/images'
                    }
                }
            },{
                test:/\.(png|jpg|gif|svg|bmp)$/,
                use:{
                    //ur-loader 在文件比较小时，直接转为base64内嵌到页面
                    loader:'url-loader',
                    options:{
                        outputPath:'images/'
                    }
                }
            },{
                test:/\.scss$/,
                loader:sassExtract.extract({
                    use:['css-loader','postcss-loader','less-loader']
                })
            },{
                test:/\.less$/,
                loader:lessExtract.extract({
                    use:['css-loader','scss-loader']
                })
            },{
                test:/\.(html)$/,
                loader:'html-withimg-loader'
            },{
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    query:{
                        presets:['env','stage-0','react']
                    }
                }
            }
        ]
    },
    plugins:[
        //用来自动向模块内部注入变量
        new webpack.ProvidePlugin({
            $:'jquery'
        }),
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            title:'hello',
            hash:true,
            chunks:['index','base','common']
        }),
        new HtmlWebpackPlugin({
            template:'./src/base.html',
            filename:'base.html',
            title:'base',
            chunks:['base','common']
        }),
        new CleanWebpackPlugin([path.join(__dirname,'dist')]),
        cssExtract,
        lessExtract,
        sassExtract,
        new CopyWebpackPlugin([{
            from:path.join(__dirname,'public'),
            to:path.join(__dirname,'dist','public')
        }])
    ],
    devServer:{
        contentBase:"./dist",
        host:"localhost",
        port:8080,
        compress:true,

    }
} 