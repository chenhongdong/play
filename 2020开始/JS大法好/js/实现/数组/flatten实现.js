// flatten是扁平化多维数组，参考underscore的flatten
// 1.核心代码就是如果数组里遍历出来的值还是数组就继续递归下去
const flatten = arr => {
    let res = [];
    return _flatten(arr, res);
};

function _flatten(arr, res) {
    // 遍历传入的数组，依次去判断是否值还是个数组
    for (let i = 0; i < arr.length; i++) {
        let val = arr[i];
        // 如果值还是个数组
        if (Array.isArray(val)) {
            _flatten(val, res);  // 继续递归直到值不再是个数组了
        } else {
            res.push(val);  // 不是数组的值就直接添加到结果数组里
        }
    }
    return res; // 最后返回结果数组
}

let arr = [1, [2, 3], [4, [5, 6, [7]]]];

// 2.利用数组的reduce方法也可以实现
const flattenReduce = arr => {
    return arr.reduce((all, cur) => {
        if (Array.isArray(cur)) {
            return [...all, ...flattenReduce(cur)];
        } else {
            return [...all, cur];
        }
    }, []);
};
console.log(flattenReduce(arr));












var array = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
var flattenFn = function (input, output) {
    for (var i = 0, length = input.length; i < length; i++) {
        var value = input[i];
        if (Array.isArray(value)) {
            flattenFn(value, output);
        } else {
            output.push(value);
        }
    }
    return output;
};

let flatten = function (array) {
    let res = [];
    return flattenFn(array, res);
};
console.log(flatten(array));


/* 
    (携程）算法手写题
    已知如下数组：

    var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];

    编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组
*/
var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];

function flatten(arr) {
    return arr.reduce((all, curr) => {
        if (Array.isArray(curr)) {
            return [...all, ...flatten(curr)]
        } else {
            return [...all, curr]
        }
    }, []);
}
let newArr = Array.from(new Set([...flatten(arr)]));
newArr.sort((a,b) => a-b);
console.log(newArr);



