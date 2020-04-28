Function.prototype.apply = function(context, arrArgs) {
    context = Object(context) || window;
    let fn = Symbol();
    context[fn] = this;
    let res = context[fn](...arrArgs);
    delete context[fn];
    return res;
}

let o = {
    a: 1
}
function fn(...b) {console.log(this.a, ...b)}

fn.apply(o, [2, 3, 4]);