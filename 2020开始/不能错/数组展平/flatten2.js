let arr = [[1,2,[3,4]], 5, [6,[7,[8,[9,10]]]]];

function flatten(arr) {
    return arr.reduce((res, cur) => {
        if (Array.isArray(cur)) {
            return [...res, ...flatten(cur)];
        } else {
            return [...res, cur];
        }
    }, []);
}

console.log(flatten(arr));

function flatten(arr) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            res.push(...flatten(arr[i]))
        } else {
            res.push(arr[i])
        }
    }
    return res;
}