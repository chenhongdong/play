/* 
给定一个 没有重复 数字的序列，返回其所有可能的全排列。
示例:
输入: [1,2,3]
输出:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
*/

var permute = function(nums) {
    // 结果数组
    let res = [];
    // 判断数组里的值是否被访问过
    let visited = new Array(nums.length).fill(0);
    // 递归+回溯寻找排列好的数据
    findPermute(nums, 0, []);

    return res;

    function findPermute(nums, index, tmp) {
        // 递归终止条件是index等于nums的长度就表示所有排列好的数组都放到res里了
        if (index === nums.length) {
            res.push(tmp);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            // 如果还没有被访问过就将nums的值push到tmp数组中，并将当前访问的值修改
            if (!visited[i]) {
                tmp.push(nums[i]);
                visited[i] = 1;
                // 递归去寻找这一组的排列结果。因为引用了同一个数组，tmp需要复制一份
                findPermute(nums, index + 1, [...tmp])
                // 回溯上一层，然后删掉最后添加的，重新寻找
                tmp.pop();
                visited[i] = 0;
            }
        }
    }
};