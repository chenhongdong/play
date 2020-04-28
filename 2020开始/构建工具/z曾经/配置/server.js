const express = require('express');
const app = express();
const webpack = require('webpack');

// 中间件
let middle = require('webpack-dev-middleware');

app.get('/user', (req, res) => {
    res.json({name: 'JS高级程序设计'})
});

app.listen(9000);