const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const bodyParser = require('body-parser')

const app = express();

app.listen(8080)
let user = {name:'fjj',pwd:123}
function checkLogin(req,res,next){
    let {username} = req.cookies;
    if(username){
        //res.redirect('/user')
        next()
    }else{
        res.redirect('/login')
    }
}
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
// app.get('/write',function(req,res){
    // res.cookie = function(key,val,options){
    //     let {domain,path,maxAge,expires,httpOnly,secure} = options;
    //     let parts = [`${key}=${val}`]
    //     if(domain){
    //         parts.push(`Domain=${domain}`)
    //     }
    //     if(path){
    //         parts.push(`Path=${path}`)
    //     }
    //     if(maxAge){
    //         parts.push(`Max-Age=${maxAge}`)
    //     }
    //     if(httpOnly){
    //         parts.push(`Http-Only=${httpOnly}`)
    //     }
    //     if(secure){
    //         parts.push(`Secure=${secure}`)
    //     }
    //     let cookieStr = parts.join('; ');
    //     res.setHeader('Set-Cookie',cookieStr)
    // }
//     res.cookie('name','fjj',{
//         domain:'/',
//         path:'/read',
//         maxAge:10,
//         httpOnly:true,
//         secure:true

//     })
//     res.end('write cookie')
// })
// app.get('/read',function(req,res){
//     res.send(req.cookies)
// })
app.set('view engine','html')
app.set('views',path.join(__dirname,'views'))
app.engine('html',require('ejs').__express)
app.get('/login',function(req,res){
    res.render('login',{title:'登陆'})
})
app.post('/login',function(req,res){
    let {username,pwd} = req.body;
    if(username == user.name && pwd == user.pwd){
        res.cookie('username',username);
        res.redirect('/user')
    }else{
        res.redirect('login')
    }
})
app.get('/user',checkLogin,function(req,res){
    res.render('user',{username:'fjj'})
})