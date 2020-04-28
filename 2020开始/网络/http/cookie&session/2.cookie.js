const http = require('http');
const querystring = require('querystring');
const crypto = require('crypto');
const secret = 'key';

http.createServer((req, res) => {
    res.getCookie = function (key, options = {}) {
        // 解析cookie，转成键值对
        let val = querystring.parse(req.headers.cookie, '; ', '=')[key] || '';
        if (val) {
            if (options.signed) {
                let [value, sign] = val.split('.');
                let newSign = crypto.createHmac('sha256', secret).update(value).digest('base64').replace(/\+|\=|\//g, '');
                console.log(sign, newSign);
                // chd.//7vg1BKrSTMxijtgGMPlCa8xZ8cHVfsy5kkrFskEJ0=
                return sign === newSign ? value : 'Wrong signature';
            }
        } else {
            return 'Empty';
        }
    };
    let arr = [];
    res.setCookie = function (key, val, options = {}) {
        let args = [];
        if (options.httpOnly) {
            args.push('httpOnly=true');
        }
        if (options.maxAge) {
            args.push(`max-age=${options.maxAge}`);
        }
        if (options.signed) {
            // sha256 加盐算法
            let sign = crypto.createHmac('sha256', secret).update(val + '').digest('base64').replace(/\+|\=|\//g, '');
            val = val + '.' + sign;
        }
        arr.push(`${key}=${val}; ${args.join('; ')}`);  // 'name=chd; httpOnly=true; max-age=10都是以分号空格隔开
        res.setHeader('Set-Cookie', arr);
    };


    if (req.url === '/read') {
        res.end(res.getCookie('name', {signed: true}));
    }
    if (req.url === '/write') {
        // 一般情况下服务端要设置httpOnly让客户端不能随意更改
        res.setCookie('name', 'chd', { httpOnly: true, maxAge: 60, signed: true });
        res.setCookie('age', 1);
        return res.end('write ok');
    }
    res.end('not found');
}).listen(3000);