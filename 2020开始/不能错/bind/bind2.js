Function.prototype.bind = function(context, ...args) {
    return (...newArgs) => {
        return this.call(context, ...args, ...newArgs);
    }
}

let o = {
    a: 1
};
function fn(b) {
    console.log(this.a, b);
}
let f = fn.bind(o, 222);    // 可以预设参数
f()