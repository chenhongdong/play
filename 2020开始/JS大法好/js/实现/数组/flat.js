let arr = [
    [1],
    [2, 3, 4],
    [5, 6, 7, [8, 9, [10, 11, [12]]]],
    13
];

// 自己实现flat
Array.prototype.flat = function() {
    let res = [];
    let self = this;    // 原始数组
    let maxDepth = 1;   // 展开的最大深度
    
    function _flat(arr, depth = 1) {
        if (depth > maxDepth) {
            maxDepth = depth;
        }
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i];
            // 如果是数组，继续递归把数组传进去再展开
            if (Array.isArray(item)) {
                _flat(item, depth + 1);
            } else {
                res.push(item);
            }
        }

    }
    _flat(self);
    console.log(maxDepth)
    return res;
};
console.log(arr.flat());

// 有多少种数组展平的方法?
// 1. ES6数组原生flat方法
// console.log(arr.flat(Infinity));

// 2. toString方法
// console.log(arr.toString().split(',').map(item => Number(item)));

// 3. JSON.stringify方法
// 去掉中括号，然后和toString是一样的了，再按照toString实现即可
// console.log(JSON.stringify(arr).replace(/\[|\]/g, '')); 

// 4. concat  每次展开一层，所以需要循环
// while (arr.some(item => Array.isArray(item))) {
//     arr = [].concat(...arr);
//     debugger;
// }
// console.log(arr);

