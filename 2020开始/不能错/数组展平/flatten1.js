let arr = [2, [1, 3, [4, 5, [7, 8]]]];

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