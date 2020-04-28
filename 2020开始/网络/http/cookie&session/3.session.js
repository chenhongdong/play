const http = require('http');
const querystring = require('querystring');
const uuid = require('uuid');

const session = {};   // 存放卡号和对应的信息
const card = 'wow'; // session是基于cookie的

http.createServer((req, res) => {
    let cookieObj = querystring.parse(req.headers.cookie, '; ');
    let cardId = cookieObj[card];

    if (cardId && session[cardId]) {
        session[cardId].money -= 10;
        res.end(`current money is ${session[cardId].money}`);
    } else {
        // 用户第一次访问
        let cardId = uuid.v4();
        session[cardId] = {money: 100}; // 第一次来充钱
        res.setHeader('Set-Cookie', `${card}=${cardId}; httpOnly=true`);   // 并且发你张卡
        res.end('welcome')
    }
}).listen(3000);