/* 
假设你是一位很棒的家长，想要给你的孩子们一些小饼干。但是，每个孩子最多只能给一块饼干。对每个孩子 i ，都有一个胃口值 gi ，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 j ，都有一个尺寸 sj 。如果 sj >= gi ，我们可以将这个饼干 j 分配给孩子 i ，这个孩子会得到满足。你的目标是尽可能满足越多数量的孩子，并输出这个最大数值。
注意：
你可以假设胃口值为正。
一个小朋友最多只能拥有一块饼干。
示例 1:
输入: [1,2,3], [1,1]
输出: 1
*/


/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function(g, s) {
    // 给g和s按照从大到小排列
    g.sort((a, b) => b - a);
    s.sort((a, b) => b - a);
    // 设置两个索引值gi和si，num为被满足了的孩子数量
    let gi = 0, si = 0, num = 0;

    while (gi < g.length && si < s.length) {
        // 如果最大的蛋糕可以满足最贪心的孩子
        if (s[si] >= g[gi]) {
            num++;
            gi++;
            si++;
        } else {    // 最大的蛋糕没满足就看第二贪心的孩子是否可以
            gi++;
        }
    }
    return num;
};