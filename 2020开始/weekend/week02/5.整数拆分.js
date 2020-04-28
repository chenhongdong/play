/* 
给定一个正整数 n，将其拆分为至少两个正整数的和，并使这些整数的乘积最大化。 返回你可以获得的最大乘积。

示例 1:

输入: 2 输出: 1 解释: 2 = 1 + 1, 1 × 1 = 1。 示例 2:

输入: 10 输出: 36 解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36。
*/

var integerBreak = function(n) {
    let memo = new Array(n + 1).fill(-1);

    return splitInt(n);

    function splitInt(n) {
        if (n === 1) {
            return 1;
        }
        if (memo[n] !== -1) {
            return memo[n];
        }
        let max = -1;
        for (let i = 1; i <= n; i++) {
            max = Math.max(max, i * (n-i), i * splitInt(n-i));
        }
        memo[n] = max;
        return max;
    }
};

console.log(integerBreak(2));