let arr = [['A', 'B'], ['a', 'b'], [1, 2]];
// 输出['Aa1', 'Aa2', 'Ab1', 'Ab2', 'Ba1', 'Ba2', 'Bb1', 'Bb2']

function permute(arr) {
    let res = [];
    if (arr.length === 0) {
        return res;
    }
    res[0] = '';
    for (let i = 0; i < arr.length; i++) {
        res = find(res, arr[i]);
    }

    return res;

    function find(arr1, arr2) {
        let tmp = [];
        for (let i = 0; i < arr1.length; i++) {
            let v1 = arr1[i];
            for (let j = 0; j < arr2.length; j++) {
                let v2 = arr2[j];
                tmp.push(v1 + v2);
            }
        }
        return tmp;
    }
}
console.time(1);
let p = permute(arr)
console.timeEnd(1)