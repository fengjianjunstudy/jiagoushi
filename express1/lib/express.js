let http = require('http');
let url = require('url')
const Application = require('./application')



// let router = [{
//     path:'*',
//     method:'*',
//     handler(req,res){

//     }
// }]
// function createApplication(){
//     return {
//         get(path,handler){
//             router.push({path,handler,method:'get'})
//         },
//         listen(){   
//             let server = http.createServer(function(req,res){
//                 let {pathname} = url.parse(req.url,true);
//                 for(let i=1;i<router.length;i++){
//                     let {path,method,handler} = router[i]
//                     if(pathname == path && method == req.method.toLowerCase()){
//                         return handler(req,res);
//                     }
//                 }
//                 router[0].handler(req,res)
//             })
//             server.listen.apply(server,arguments);
//         }
//     }
// }
function createApplication(){
    return new Application();
}
module.exports = createApplication;