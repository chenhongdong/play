function sum(a, b, c) {
    return a + b + c;
}

function curry(fn, ...args) {
    if (args.length < fn.length) {
        return (...newArgs) => {
            return curry(fn, ...args, ...newArgs);
        }
    } else {
        return fn(...args);
    }
}

// 简写
function curry(fn, ...args) {
    return args.length < fn.length ? (...newArgs) => curry(fn, ...args, ...newArgs) : fn(...args);
}

let add = curry(sum);
console.log(add(1)(2)(3));
console.log(add(1, 2)(3));
console.log(add(1, 2, 3));