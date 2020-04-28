const express = require('express');
const app = express();

app.use('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);

    next();
});

app.get('/',(req, res) => {

    const cookie = req.headers.cookie;
    console.log('前端传过来的cookie: ', cookie);


    res.header('Content-Type', 'text/plain; charset=utf8');
    res.json({
        code: 0,
        arr: [1,2,3],
        msg: '成功'
    })
})


app.listen(4000);