/* 
给定一个无序的整数数组，找到其中最长上升子序列的长度。
示例:
输入: [10,9,2,5,3,7,101,18]
输出: 4 
解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4。
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    // 如果数组长度为0就直接返回0
    if (nums.length === 0)
        return 0;
    // 创建一个nums长度的数组，用来计数
    let len = nums.length;
    let memo = new Array(len).fill(1);

    // 两层遍历，做前后比较
    for (let i = 1; i < len; i++) {
        for (let j = 0; j < i; j++) {
            // 如果前面的值比后面的值小，就更新memo数组后面的值
            if (nums[j] < nums[i]) {
                memo[i] = Math.max(memo[i], memo[j] + 1);
            }
        }
    }
    // 最大值记录用来和memo数组里的值做比较，统计上升的长度
    let max = 1;
    for (let i = 0; i < len; i++) {
        max = Math.max(max, memo[i]);
    }
    return max;
};