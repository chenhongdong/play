/* 
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

示例:

给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9 所以返回 [0, 1]
*/

var twoSum = function(nums, target) {
    // 利用map来处理
    let map = new Map();

    for (let i = 0; i < nums.length; i++) {
        // 计算剩余的差值
        let res = target - nums[i];
        // 如果map中有差值，那就可以找到对应索引的位置
        if (map.has(res)) {
            return [map.get(res), i];
        }
        // 把key设置为数组每一项，value设置为索引值
        map.set(nums[i], i);
    }
};

let nums = [22, 2, 7, 11, 15], target = 9;
console.log(twoSum(nums, target));