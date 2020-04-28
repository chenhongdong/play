// 函数柯里化，可以分开传递参数

function add(a, b, c, d, e) {
    return a + b + c + d + e;
}
// 柯里化
function curry(fn, ...args) {
    // 函数的参数个数和传入的参数个数比较
    // 还不到函数的个数，就返回新的函数递归调用curry
    // 达到了参数个数就让函数执行即可
    return args.length < fn.length ? (...innerArgs) => curry(fn, ...args, ...innerArgs) : fn(...args);

    // if (args.length < fn.length) {
    //     return (...innerArgs) => {
    //         return curry(fn, ...args, ...innerArgs);
    //     }
    // } else {
    //     return fn(...args);
    // }
}

let sum = curry(add);

console.log(sum(1, 2)(3, 4)(5));
console.log(sum(1)(2)(3)(4)(10));








function curry(fn, ...args) {
    if (args.length < fn.length) {
        return (...newArgs) => {
            return curry(fn, ...args, ...newArgs);
        }
    } else {
        return fn(...args);
    }
}

function sum(a, b, c, d, e) {
    return a + b + c + d + e;
}

let add = curry(sum);
console.log(add(1,2,3,4)(5));
console.log(add(1)(2)(3)(4)(5));
console.log(add(1, 2)(3, 4)(5));
console.log(add(1)(2)(3)(4)(5));