const url = require('url');
const Layer = require('./layer');
// 每个路由都要有一个route实例
const Route = require('./route');


function Router() {
    let router = function(req, res, next) {
        // 当请求到来时，需要到对应的子路由系统中查找
        router.handler_request(req, res, next);
    };
    router.stack = [];
    // {name: [fn, fn2], age: [fn]}
    proto.paramsCallbacks = {};
    // 让当前的函数，向上查找可以找到proto
    router.__proto__ = proto;
    return router;
}
// 继承
let proto = {};

['get', 'post', 'put', 'delete'].forEach(method => {
    proto[method] = function (path, handlers) {
        // 如果router.get请求路由，handlers不是个数组，保证是数组给它包起来
        if (!Array.isArray(handlers)) {
            handlers = [handlers];
        }
        // 1先产生route实例
        // 产生route后需要将handler存到route里的stack中
        let route = this.route(path);
        route[method](handlers);
    };
});

proto.use = function(path, handler) {
    let layer = new Layer(path, handler);
    this.stack.push(layer);
};


proto.route = function(path) {
    let route = new Route();
    // 每次调用get方法就产生一个layer
    // 把route放到layer上
    // 当路径匹配到交给对应的dispatch方法处理,bind绑定route
    let layer = new Layer(path, route.dispatch.bind(route));
    layer.route = route;
    this.stack.push(layer);
    return route;
};

// 原理就是发布订阅
proto.param = function(key, handler) {
    if (this.paramsCallbacks[key]) {
        this.paramsCallbacks[key].push(handler);
    } else {
        this.paramsCallbacks[key] = [handler];
    }
};

proto.process_param = function(req, res, layer, done) {
    let params = this.paramsCallbacks;
    let keys = layer.keys.map(item => item.name);
    if (!keys || keys.length === 0) {
        return done();  // 不需要处理参数
    }
    let idx = 0;
    let callbacks;
    let key;
    let value;

    let next = () => {
        if (idx === keys.length) {
            return done();
        }
        key = keys[idx++];
        value = layer.params[key];
        console.log(params);
        if (key) {
            callbacks = params[key]; // [fn, fn2]
            // 把函数处理交给resolve
            processCallback(next);
        } else {
            next();
        }
    };
    next();

    function processCallback(out) {
        let idx = 0;
        let next = () => {
            let callback = callbacks[idx++];
            // 如果有回调函数就执行函数
            if (callback) {
                callback(req, res, next, value, key);
            } else {
                // 没有就应该去找下一个key
                out();
            }
        };
        next();
    }
};

proto.handler_request = function (req, res, out) {
    let idx = 0;
    let removed = '';
    // next这种属于洋葱模型，一层一层的
    let next = (err) => {
        // 说明以前删除过中间件里的path路径
        if (removed.length > 0) {
            // 传给下一个中间件二级路由的时候再给带上（比如上面的二级路由都没匹配上）
            req.url = removed + req.url;
            removed = '';
        }
        // 处理边界情况，所有路由都没匹配到，直接跳出
        if (idx === this.stack.length) {
            return out();
        }
        // 先拿出一层来执行
        let layer = this.stack[idx++];
        let { pathname } = url.parse(req.url);

         

        // 当请求到来时，会遍历所有的layer，如果是路由，严格匹配路径
        // 中间件的话，路径开头相同或者是/都匹配，中间件是没有方法的

        if (err) {
            // 找到错误中间件
            if (!layer.route) {
                // 中间件的参数是否是4个
                if (layer.handler.length === 4) {
                    layer.handler(err, req, res, next);
                } else {
                    next(err);
                }
            } else {
                next(err); // 路由的话，继续传递错误
            }
        } else {
            // layer.path = /user/:id/:auth   和/user/1107/login做匹配
            console.log('pathname---',pathname);
            if (layer.match(pathname)) {
                if (layer.route) {  // 路由
                    // 判断路径和方法是否匹配
                    if (layer.route.methods[req.method.toLowerCase()]) {
                        // 给req上添加params属性，当做路径参数
                        req.params = layer.params || {};

                        // 需要执行param方法,将请求响应传入，并且将layer也传入(layer.keys)
                        proto.process_param(req, res, layer, () => {
                            // 匹配就执行处理方法
                            layer.handler(req, res, next);
                        });
                    } else { // 没匹配到继续向下执行
                        next();
                    }
                } else {// 如果是中间件，路径匹配到了就执行
                    if (layer.handler.length !== 4) {
                        // 中间件会出现二级路由，需要把当前中间件的路径，从当前url删除掉
                        // 如果这个中间件是/就不要删除了
                        if (layer.path !== '/') {   
                            removed = layer.path;
                            console.log(removed, req.url);
                            req.url = req.url.slice(removed.length);
                        }
                        
                        layer.handler(req, res, next);
                    }
                }
            } else {    
                next();
            }
        }
    };
    // 上来先调用一次让next函数执行
    next();
};

module.exports = Router;