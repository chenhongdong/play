const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');
const crypto = require('crypto');

http.createServer((req, res) => {
    let {pathname} = url.parse(req.url);
    let absPath = path.join(__dirname, pathname);
    console.log(pathname);
    fs.stat(absPath, (err, statObj) => {
        if (err) {
            res.statusCode = 404;
            res.end();
            return;
        }
        if (statObj.isFile()) {
            // 强缓存
            // max-age相对时间，表示10秒内不用再请求了，去缓存文件里找
            // res.setHeader('Cache-Control', 'max-age=10');
            // 兼容低版本，用expires，返回的状态码还是200，一般图片和logo都是强制缓存比较多
            // res.setHeader('Expires', new Date(+new Date + 20 * 1000).toUTCString());


            // 协商缓存  last-modified和if-modified-since
            // let clientHeader = req.headers['if-modified-since'];
            // if (clientHeader) {
            //     let currentTime = statObj.ctime.toUTCString();
            //     if (clientHeader === currentTime) {
            //         res.statusCode = 304;
            //         res.end();
            //     } else {
            //         res.setHeader('Cache-Control', 'no-cache');
            //         res.setHeader('Last-Modified', statObj.ctime.toUTCString());
            //     }
            // } else {
            //     res.setHeader('Cache-Control', 'no-cache');
            //     res.setHeader('Last-Modified', statObj.ctime.toUTCString());
            // }
            

            // 协商缓存 etag和if-none-match


            let content = fs.readFileSync(absPath, 'utf8'); 
            let md5 = crypto.createHash('md5').update(content).digest('base64');

            let clientHeader = req.headers['if-none-match'];
            if (clientHeader) {
                if (clientHeader === md5) {
                    res.statusCode = 304;
                    res.end();
                    return;
                }
            }
            res.setHeader('Etag', md5);


            fs.createReadStream(absPath).pipe(res);
        }
    });
}).listen(4000);