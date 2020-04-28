const http = require('http');
const querystring = require('querystring');
const uuid = require('uuid');
const session = {};
const key = 'cookie_gogogo';

http.createServer((req, res) => {
    let cookieObj = querystring.parse(req.headers.cookie, '; ');
    let card = cookieObj[key];

    if (card && session[card]) {
        session[card].money -= 10;
        res.end(`current money is ${session[card].money}`);
    } else {
        // 第一次访问返回个cookie给客户端
        const card = uuid.v4();
        session[card] = {money: 1000};
        res.setHeader('Set-Cookie', `${key}=${card}; httpOnly=true;`);
        res.end('welcome baby');
    }
    res.end('not found');
}).listen(4000);