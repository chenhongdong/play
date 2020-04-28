/* 
给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。

示例:

输入: n = 4, k = 2

输出: [ [2,4], [3,4], [2,3], [1,2], [1,3], [1,4], ]
*/

var combine = function (n, k) {
    let res = [];
    // 处理边界，n必须大于k，且它们都不能小于0
    if (n <= 0 || k <= 0 || n < k) {
        return res;
    }

    findCombine(n, k, 1, []);

    function findCombine(n, k, index, arr) {
        if (arr.length === k) {
            res.push(arr);
            return;
        }

        for (let i = index; i <= n - (k - arr.length) + 1; i++) {
            arr.push(i);
            findCombine(n, k, i + 1, [...arr]);
            arr.pop();
        }
        return;
    }

    return res;
};

console.log(combine(4, 2));