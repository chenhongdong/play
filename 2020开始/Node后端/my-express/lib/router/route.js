const Layer = require('./layer');

function Route() {
    this.stack = [];
    this.methods = {};  // 存放请求的方法，如果不为true就不会走
}

['get', 'post', 'put', 'delete'].forEach(method => {
    Route.prototype[method] = function(handlers) {
        handlers.forEach(handler => {
            let layer = new Layer('', handler);
            layer.method = method; // 内部的route中要标识这一层是什么方法
            this.methods[method] = true;
            this.stack.push(layer);
        });
    };
});


Route.prototype.dispatch = function(req, res, out) {
    // 需要在route中，依次取出layer，看方法是否匹配
    let idx = 0;
    let next = (err) => {
        if (err) {  // 如果有报错就显示找不到路由
            return res.end(`Cannot ${req.method} ${req.url}`);
        }
        if (idx === this.stack.length) {
            return out();
        }
        let layer = this.stack[idx++];
        console.log(layer.method, req.method);
        if (layer.method === req.method.toLowerCase()) {
            layer.handler(req, res, next);
        } else {
            next();
        }
    };
    next();
};

module.exports = Route;