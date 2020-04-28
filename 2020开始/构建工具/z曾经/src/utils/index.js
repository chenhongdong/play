export const parseUrl = (url) => {
    console.log('url');
};
// 数组的扁平化方法
export const flatten = arr => {
    return arr.reduce((all, cur) => {
        if (Array.isArray(cur)) {
            return [...all, ...flatten(cur)];
        } else {
            return [...all, cur];
        }
    }, []);
};
// bind方法，绑定修改函数的this指向
export const bind = (fn, context) => {
    let args = Array.prototype.slice.call(arguments, 2);
    return function () {
        let newArgs = Array.prototype.slice.call(arguments);
        return fn.apply(context, args.concat(newArgs));
    }
};
// call方法
export const call = (fn, context) => {
    context = context ? Object(context) : window;
    context.fn = fn;
    let res = [];
    for (let i = 2; i < arguments.length; i++) {
        res.push(`arguments[${i}]`);
    }
    let r = eval(`context.fn(${res})`);
    delete context.fn;

    return r;
};

// apply方法
export const apply = (fn, context, args) => {
    context = context ? Object(context) : window;
    context.fn = fn;
    if (!args) {
        return context.fn();
    }
    let r = eval(`context.fn(${args})`);
    delete context.fn;
    return r;
};


const Utils = {
    flatten,
    parseUrl,
    bind,
    apply,
    call
};

export default Utils;