var http = require('http');
var fs = require('fs');
var url = require('url');
var root = 'static';

http.createServer((req , res)=>{
    var urlObj = url.parse(req.url , true ,false);
    var path = '';
    if( urlObj.pathname === '/') {
        path = 'index.html';
    } else {
        path = root + path;
    }
    try{
        var data = fs.readFileSync(path);
        res.writeHead(200);
        res.end(data);
    } catch(e) {
        res.writeHead(404);
        res.end(JSON.stringify(e));
    } 
}).listen(8080);