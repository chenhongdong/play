const express = require('express');
const app = express();


app.get('/info', (req, res) => {
    res.json({
        nickname: '我滴个大榴莲啊',
        level: 8,
        src: 'https://music.163.com/song/media/outer/url?id=1382794914.mp3'
    });
});

app.listen(3000);