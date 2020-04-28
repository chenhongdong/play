let combine = function(n, k) {
    let res = [];
    if (n <= 0 || k <= 0 || n < k) {
        return res;
    }

    findCombine(n, k, 1, []);

    return res;

    function findCombine(n, k, start, arr) {
        if (k === arr.length) {
            res.push(arr);
            return;
        }

        for (let i = start; i <= n; i++) {
            arr.push(i);
            findCombine(n, k, i + 1, [...arr]);
            arr.pop();
        }

        return;
    }
}

console.log(combine(4, 2));