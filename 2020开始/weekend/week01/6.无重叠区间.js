/* 
给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。
注意:
可以认为区间的终点总是大于它的起点。
区间 [1,2] 和 [2,3] 的边界相互“接触”，但没有相互重叠。
示例 1:
输入: [ [1,2], [2,3], [3,4], [1,3] ]
输出: 1
解释: 移除 [1,3] 后，剩下的区间没有重叠。
*/

/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function(intervals) {
    // 如果数组为空，直接返回0
    if (intervals.length === 0)
        return 0;
    // 先给二维数组从小到大排序
    intervals.sort((a, b) => {
        if (a[1] !== b[1]) {
            return a[1] - b[1];
        }
        return a[0] - b[0];
    });
    // 保存最大区间
    let max = 1;
    let prev = 0;   // 记录上一个数组的索引

    for (let i = 1; i < intervals.length; i++) {
        // 后面数组的首项大于等于前面数组的末项就表示不重叠
        if (intervals[i][0] >= intervals[prev][1]) {
            max++;
            prev = i;
        }
    }
    // 最小区间 = 长度 - 最大区间
    return intervals.length - max;
};