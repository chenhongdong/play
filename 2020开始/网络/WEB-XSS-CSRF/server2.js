const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');    // 可以获取cookie
// 设置静态文件夹
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));




app.listen(3001);



// 跨站请求伪造 钓鱼网站
// 给个吸引他的网站