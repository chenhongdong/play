const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');    // 可以获取cookie

let svgCaptcha = require('svg-captcha');    // 生成验证码
// 设置静态文件夹
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

// 模拟一个用户列表
let userList = [
    { username: 'chd', password: '1234', money: 100000 },
    { username: 'jialin9', password: '123456', money: 100 },
    { username: 'god', password: '111', money: 0 }
];

let SESSION_ID = 'connect.sid';
let session = {};

app.post('/api/login', function (req, res) {
    let { username, password } = req.body;
    let user = userList.find(user => user.username === username && user.password === password);

    if (user) {
        // 服务器需要在用户登录后给一个信息
        let cardId = Math.random() + Date.now();    // 给个卡号
        session[cardId] = { user };       //{110: {user:{username: 'chd'}}}
        res.cookie(SESSION_ID, cardId, { httpOnly: false });   // httpOnly: true会让前端也无法获取cookie
        res.json({ code: 0 });
    } else {
        res.json({ code: 1, error: '用户不存在！' });
    }
});

// 反射型XSS攻击  http://localhost:3456/welcome?type=<script>alert(document.cookie)</script>
// 一般情况下会让cookie在前端不可获取，并不是解决XSS的方案，只是降低了受损范围
// 解决1： 查询参数 加上encodeURIComponent解决
app.get('/welcome', function (req, res) {
    res.send(`${encodeURIComponent(req.query.type)}`);
});


// 模拟用户评论信息
let comments = [{ username: 'chd', content: '天亮了，下雪了' }, { username: 'zs', content: '哎呦，不错哦~' }]

app.get('/api/list', function (req, res) {
    res.json({ code: 0, comments });
});

app.post('/api/add', function (req, res) {

    // 当你添加评论时
    let result = session[req.cookies[SESSION_ID]] || {};   // {user:{username:'chd',password: '1234'}}
    let user = result.user;
    if (user) {
        comments.push({ username: user.username, content: req.body.content });
        res.json({ code: 0 });
    } else {
        res.json({ code: 1, error: '用户未登录！' });
    }
});



app.get('/api/userinfo', function (req, res) {
    let result = session[req.cookies[SESSION_ID]] || {};
    // data表示的是svg内容，text表示验证码对应的结果
    let { data, text } = svgCaptcha.create();
    result.text = text;     // 下次请求时应该拿到返回的结果和上次存好的结果做对比
    let user = result.user;

    if (user) {
        res.json({
            code: 0,
            user: {
                username: user.username,
                money: user.money,
                svg: data
            }
        })
    } else {
        res.json({ code: 1, error: '用户未登录' });
    }
});

// 转账接口
app.post('/api/transfer', function (req, res) {
    let result = session[req.cookies[SESSION_ID]] || {};
    let user = result.user;
    let referer = req.headers['referer'];

    if (referer.includes('http://localhost:3456')) {
        if (user) {
            let { target, money, code, token } = req.body;
            console.log(token);
            console.log('web_',req.cookies[SESSION_ID]);
            // token相同
            if ('web_' + req.cookies[SESSION_ID] === token) {
                // 如果有验证码
                // 并且输入的验证码符合
                if (code && code === result.text) {
                    money = Number(money);

                    userList.forEach(u => {
                        if (u.username === user.username) {
                            u.money -= money
                        }
                        if (u.username === target) {
                            u.money += money;
                        }
                    });
                    res.json({ code: 0 });
                } else {
                    res.json({ code: 1, error: '验证码不正确' });
                }
            } else {
                res.json({code: 1, error: 'token不相同'});
            }
        } else {
            res.json({ code: 1, error: '用户未登录' });
        }
    } else {
        res.json({code: 1, error: '来源不同'});
    }


});

app.listen(3456);



// 跨站请求伪造 钓鱼网站
// 给个吸引他的网站
/*
CSRF防御
1.添加验证码(体验不好)
    express用svg-captcha来生成验证码，钓鱼网站拿不到验证码
2.判断来源 referer
    通过请求头里的referer来判断来源是否一致
3.token
    钓鱼网站不能拿到cookie，可以通过cookie+标识符发给服务端，让服务端去匹配发送的token是否一致
*/