function sum(a, b, c, d) {
    return a + b + c + d;
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

let add = curry(sum);
console.log(add(1)(2)(3)(4));
console.log(add(1, 2, 3)(4));
console.log(add(1, 2)(3, 4));
console.log(add(1)(2, 3)(4));