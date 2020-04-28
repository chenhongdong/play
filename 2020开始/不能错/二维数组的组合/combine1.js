let arr = [['热', '冷'], ['大', '中']];

function combine(arr) {
    let res = [];
    if (arr.length === 0) {
        return [];
    }
    res[0] = '';
    for (let i = 0; i < arr.length; i++) {
        res = find(res, arr[i]);
    }
    return res.map(v => v.slice(1));


    function find(arr1, arr2) {
        let tmp = [];
        for (let i = 0; i < arr1.length; i++) {
            let v1 = arr1[i];
            for (let j = 0; j < arr2.length; j++) {
                let v2 = arr2[j];
                tmp.push(v1 + '+' + v2);
            }
        }
        return tmp;
    }
}

console.log(combine(arr));