import {t, test} from './test';
console.log('common');
console.log(t);
console.log(test());

export const flatten = arr => {
    console.log('myflatten');
    return arr.reduce((all, cur) => {
        if (Array.isArray(cur)) {
            return [...all, ...flatten(cur)];
        } else {
            return [...all, cur];
        }
    }, []);
};

export const myBind = (fn, context) => {
    let args = [].slice.call(arguments, 2);
    console.log('mybind');
    return function() {
        let newArgs = [].slice.call(arguments);
        fn.apply(context, args.concat(newArgs));
    }  
};