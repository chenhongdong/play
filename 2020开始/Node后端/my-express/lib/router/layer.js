const {pathToRegexp} = require('path-to-regexp');

function Layer(path, handler) {
    this.path = path;
    this.handler = handler;
    // 需要在生成layer的时候，将path转换成正则
    this.reg = pathToRegexp(this.path, this.keys = []);
    // layer中新增了两个属性
    // reg是当前的正则， keys存放的是当前匹配的key
}

// 看一下这一层能不能匹配到
Layer.prototype.match = function(pathname) {
    if (this.route) {   // 路由才需要处理匹配的正则
        let [,...matches] = pathname.match(this.reg);
        if (matches) {
            // 将解析后的params放到layer上
            this.params = this.keys.reduce((memo, current, index, arr) => {
                // {id: 1107}
                memo[current.name] = matches[index];
                return memo;
            }, {});
            return true;
        }
    }
    if (!this.route) {  // 不是路由，表示是中间件
        if (this.path === '/') {
            return true;
        }
        // /user/add
        if (pathname.startsWith(this.path + '/')) {
            return true;
        }
    }
    return pathname === this.path;
}

module.exports = Layer;