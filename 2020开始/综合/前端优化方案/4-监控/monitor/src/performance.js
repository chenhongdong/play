// 专门用来写页面性能监控的逻辑

let handleData = (p) => {
    let data = {
        prevPage: p.fetchStart - p.navigationStart, // 上一个页面到这个页面的时长
        redirect: p.redirectEnd - p.redirectStart,  // 重定向的时长
        dns: p.domainLookupEnd - p.domainLookupStart,   // dns解析时长
        tcp: p.connectEnd - p.connectStart,          // TCP连接的时长

        // 从请求到响应的时长
        send: p.responseEnd - p.requestStart,       // 请求到响应的时长
        ttfb: p.responseStart - p.navigationStart,  // 首字节接收时长

        // dom部分
        domready: p.domInteractive - p.domLoading,  // dom准备的时长
        // 白屏
        whiteScreen: p.domLoading - p.navigationStart,  // 白屏时间

        dom: p.domComplete - p.domLoading,          // dom解析时间

        load: p.loadEventEnd - p.loadEventStart,    // onload时长

        total: p.loadEventEnd - p.navigationStart   // 总时长
    };
    return data;
}
// 页面都加载完再做处理
let load = (cb) => {
    let timer;
    let check = () => {
        if (performance.timing.loadEventEnd) {  // 在load的时候loadEventEnd还是0呢
            clearTimeout(timer);
            cb();
        } else {
            timer = setTimeout(check, 100);
        }
    }
    window.addEventListener('load', check);
}

let domReady = (cb) => {
    let timer;
    let check = () => {
        if (performance.timing.domInteractive) {  // 在load的时候loadEventEnd还是0呢
            clearTimeout(timer);
            cb();
        } else {
            timer = setTimeout(check, 100);
        }
    }
    window.addEventListener('DOMContentLoaded', check);
}

export default {
    init(cb) {
        domReady(() => {    // 有可能没有触发onload,dom解析完成后先统计一下，可能用户没加载完就关页面了
            let perfData = performance.timing;
            let data = handleData(perfData);
            data.type = 'domready';
            cb(data);
        });
        load(() => {
            let perfData = performance.timing;
            let data = handleData(perfData);
            data.type = 'loaded';
            cb(data);
        });
    }
}