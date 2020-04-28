import performance from './performance';

// 1.监控页面性能  算时间差 performance API
performance.init((data) => {    // 获取到页面性能相关的数据
    console.log(data);
});

let report = (() => {
    let imgs = [];
    return (url) => {
        let img = new Image();
        imgs.push(img);
        img.src = url;
    }
})

report('http://localhost/srp.gif');