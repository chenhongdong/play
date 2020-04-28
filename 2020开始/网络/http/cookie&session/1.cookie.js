// 常见问题： localStorage sessionStorage cookie session 区别

// localStorage(你不删除一直有) 不能跨域
// sessionStorage(标签关闭就没了)   5M的内存


// cookie是，解决http无状态的问题
// cookie (每次请求都自动带过去)    可以保持通信  4k
// 不要什么都放到cookie里，会造成流量浪费，合理设置cookie
// 存放到客户端里，不安全（敏感信息不要存）


const http = require('http');

http.createServer((req, res) => {
    if (req.url === '/read') {
        // 读取cookie
        res.setHeader('content-type', 'text/plain; charset=utf-8');
        res.end(req.headers['cookie'] || 'cookie为空')
    }
    // domain 域名 不能跨域，可以与子域共享
    // path 在哪个路径下生效  可以减少cookie的传输
    // expires 绝对时间  max-age 相对时间-秒
    // httpOnly 是否能在客户端更改
    if (req.url === '/write') {
        res.setHeader('Set-Cookie', 'washCount=10; max-age=5');
        res.end('write cookie finish');
        return;
    }
}).listen(3000);