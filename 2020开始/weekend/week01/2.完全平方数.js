/* 
给定正整数 n，找到若干个完全平方数（比如 1, 4, 9, 16, ...）使得它们的和等于 n。你需要让组成和的完全平方数的个数最少。
示例 1:
输入: n = 12
输出: 3 
解释: 12 = 4 + 4 + 4.
*/

var numSquares = function (n) {
    // 创建一个队列并把n存进去
    let q = [];
    q.push(new Pair(n, 0));
    // 创建一个n+1的数组，用来记录值的访问状态
    let visited = new Array(n + 1).fill(false);
    visited[n] = true;
    // 遍历队列
    while (q.length) {
        let { num, step } = q.shift();
        // 完全平方数是从1开始的，1,4,9,16,25....
        for (let i = 1; ; i++) {
            let value = num - i * i;
            // 计算的值如果小于0了，就表示不能再计算了
            if (value < 0) break;
            // value为0了，就表示已经被完全平方数计算出来了，只需要在之前的step步数上加1就是正确的步数了
            if (value === 0) {
                return step + 1;
            }
            // 如果还没有访问过的就把值push到队列中
            if (!visited[value]) {
                q.push(new Pair(value, step + 1));
                visited[value] = true;
            }
        }
    }
};

// 辅助函数
function Pair(num, step) {
    this.num = num;
    this.step = step;
}

numSquares(12);