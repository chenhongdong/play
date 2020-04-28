Function.prototype.call = function(context, ...args) {
    context = Object(context) || window;
    let fn = Symbol();
    context[fn] = this;
    let res = context[fn](...args); // 执行函数
    delete context[fn];
    return res;
};

let o = {
    a: 1
}
function fn(b) {
    console.log(this.a, b);
}
fn.call(o, '你好');