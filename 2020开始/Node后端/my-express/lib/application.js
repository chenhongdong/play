// 创建应用主要逻辑

const http = require('http');

let Router = require('./router');

// 应用类，方便扩展
// 应用和路由的分离
function Application() {}
// 路由懒加载
Application.prototype.lazy_route = function() {
    if (!this.router) {
        this.router = new Router();
    }
};
// get,post,put,delete  将注册的方法，放到路由系统中
['get', 'post', 'put', 'delete'].forEach(method => {
    Application.prototype[method] = function(path, ...handlers) {
        this.lazy_route();
        this.router[method](path, handlers);
    };
});
// use
Application.prototype.use = function(path, handler) {
    this.lazy_route();
    // 如果handler是undefined，就表示没传path,默认是/
    if (typeof handler !== 'function') {
        handler = path;
        path = '/';
    }
    // 让router去处理
    this.router.use(path, handler);
};
// 处理用户定义的属性
Application.prototype.param = function(key, handler) {
    this.lazy_route();
    this.router.param(key, handler);
};


// listen
Application.prototype.listen = function() {
    let server = http.createServer((req, res) => {
        this.lazy_route();

        function done() {   // 没匹配到跳404
            res.end(`Cannot ${req.method} ${req.url}`);
        }
        this.router.handler_request(req, res, done);
    });
    server.listen(...arguments);
};

module.exports = Application;