const http = require('http');
const querystring = require('querystring');
const crypto = require('crypto');

http.createServer((req, res) => {
    res.getCookie = function(key, options = {}) {
        console.log(req.headers.cookie);   // username=chd; password=fuck-you
        // querystring.parse可以解析字符串为对象，指定分隔符作为分隔，下面就是先以; 分隔，再用=号分隔
        let val = querystring.parse(req.headers.cookie, '; ','=')[key] || '';
        if (val) {
            if (options.signed) {
                let [value, sign] = val.split('.');
                let newSign = crypto.createHmac('sha256', key).update(value).digest('base64').replace(/\/|\+|\=/g, '');
                // 需要比较新旧的签名是否一致，一致的话才返回对应的cookie值
                return sign === newSign ? value : 'Wrong signature';
            }
        } else {
            return 'Empty';
        }
    };
    let arr = [];
    res.setCookie = function(key, val, options = {}) {
        let args = [];
        if (options.httpOnly) { // 设置客户端不能通过document.cookie拿到值
            args.push('httpOnly=true');
        }
        if (options.maxAge) {   // 设置cookie过期时间
            args.push(`max-age=${options.maxAge}`);
        }
        if (options.signed) {   // 设置签名，防止别人修改cookie值
            val = val + '.' + crypto.createHmac('sha256', key).update(val).digest('base64').replace(/\/|\+|\=/g, '');
        }
        // if (options.secure) {   // 设置secure的话，只能通过https协议才能发送cookie
        //     args.push('secure=true');
        // }
        arr.push(`${key}=${val}; ${args.join('; ')}`);
        res.setHeader('Set-Cookie', arr);
        // 补充
        // domain： 指定域名可以带上cookie,比如domain=so.com主域设置后，子域名也会带上cookie(如:news.so.com)
        // path: 指定请求的url路径可以带cookie,比如/hotnews及它的子级/hotnews/hot
        // same-site: 跨站请求时指定不带哪些cookie,用来阻止跨站请求伪造CSRF
    };

    if (req.url === '/read') {  // 读取cookie
        res.end(res.getCookie('password', {signed: true}));
    }
    if (req.url === '/write') { // 写入cookie
        res.setCookie('username', 'chd')
        res.setCookie('password', 'fuck-you', {httpOnly: true, maxAge: 40, signed: true});
        res.end('write cookie ok');
        return;
    }
 }).listen(3000);

 // 普通的getCookie
 function getCookie(key) {
     let arr = document.cookie.match(new RegExp('(^| )' + key + '=([^;]*)(;|$)'));

     if (arr && arr.length) {
         return decodeURIComponent(arr[2]);
     }
     return null;
 }


 function getCookie(key) {
     let arr = document.cookie.match(new RegExp('(^| )' + key + '=([^;]*)(;|$)'));

     if (arr && arr.length) {
         return decodeURIComponent(arr[2]);
     }

     return null;
 }