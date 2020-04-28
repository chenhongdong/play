Function.prototype.call = function(context, ...args) {
    context = Object(context) || window;
    let fn = Symbol();
    context[fn] = this;
    let res = context[fn](...args);
    delete context[fn];
    return res;
}

let o = {
    a: 1
};
function fn(b, c) {
    console.log(this.a, b, c);
}
fn.call(o, 3, 2)