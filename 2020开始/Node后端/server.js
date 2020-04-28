const express = require('express');
// const express = require('./my-express');
let app = express();    // app 就是一个监听函数，内部会创建一个应用

// app.param('id', (req, res, next, value, key) => {
//     if (value === '1107') {
//         next();
//     }
// });
// app.param('auth', (req, res, next, value, key) => {
//     if (value === 'login') {
//         next();
//     }
// });

// 路径参数
app.get('/user/:id/:auth', (req, res, next) => {
    console.log(req.params,'✌️');
    res.end('哈哈哈，开心')
});



// 二级路由系统
/* let router  = express.Router();
let router2  = express.Router();

router.get('/add', (req, res, next) => {
    res.end('user add');
});
router.get('/delete', (req, res, next) => {
    res.end('user delete')
});
// /xxx
router2.get('/xxx', (req, res, next) => {
    res.end('xxx');
});

app.use('/user', router);   // 挂载了一个路由中间件，中间件就是个函数
app.use('/user', router2); */


// express内置了路由系统
/* app.post('/', (req, res, next) => {
    console.log('1');
    next();
}, (req, res, next) => {
    console.log('2');
    next()
}, (req, res, next) => {
    console.log('3');
    next();
});

app.get('/', (req, res) => {
    console.log('4');
    res.setHeader('Content-Type', 'text/plain; charset=utf8')
    res.end('开心')
}) */

// 中间件  特点:可以封装一些公共逻辑，扩展req, res，决定是否向下执行
// 错误处理， 只要next方法里传入值就表示有错误
/* app.use('/', (req, res, next) => {
    console.log('中间件1');
    // next('err');
    next();
});
app.use('/u', (req, res, next) => {
    console.log('中间件2');
    next();
});
app.use('/user', (req, res, next) => {
    console.log('中间件3');
    next();
});
app.use('/user/add', (req, res, next) => {
    next('add');    // route中的next
}); */

// 错误处理中间件要放到页面最下面
/* app.use((err, req, res, next) => {
    console.log(err);
    res.end('not found!');
}); */
app.listen(5000);   // 监听端口号