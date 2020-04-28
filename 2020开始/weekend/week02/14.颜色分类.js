/* 
给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

注意: 不能使用代码库中的排序函数来解决这道题。

示例:

输入: [2,0,2,1,1,0]

输出: [0,0,1,1,2,2]
*/
var sortColors = function(nums) {
    let zero = -1;      // nums[0...zero]区间
    let two = nums.length;  // nums[two...nums.length]区间

    for (let i = 0 ; i < nums;) {
        if (nums[i] === 1) {
            i++;
        } else if (nums[i] === 2) {
            two--;
            swap(nums, two, i);
        } else {
            zero++;
            swap(nums, zero, i);
            i++;
        }
    }
    return nums;
};

function swap(arr, i, j) {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

console.log(sortColors([2,0,2,1,1,0]));