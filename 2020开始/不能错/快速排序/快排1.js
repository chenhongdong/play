let quickSort = function(arr) {
    quick(arr, 0, arr.length - 1);
}

function quick(arr, l, r) {
    if (l >= r) {
        return;
    }

    let p = partition(arr, l, r);
    quick(arr, l, p - 1);
    quick(arr, p + 1, r);
}
// arr[l...p-1] < arr[p]   arr[p+1...r] > arr[p]
function partition(arr, l, r) {
    // 取中间位置，防止在近乎有序的数组中，回退到O(n^2)
    swap(arr, l, Math.floor((l+r)/2));
    let v = arr[l];

    // arr[l+1...j] < v > arr[j+1...i]
    let j = l;
    for (let i = l + 1; i <= r; i++) {
        // let e = arr[i];
        // arr[i]就相当于e
        if (arr[i] < v) {
            swap(arr, j + 1, i);
            j++;
        }
    }
    // 最后交换l和j的位置，保证v左边都是小的，右边都是大的
    swap(arr, l, j);

    return j;
}
function swap(arr, i, j) {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

let arr = [20, 2, 19, 11, 8, 7, 6, 10, 21, 18, 29, 30, 27, 1, 3, 4, 5, 12, 13, 17, 33];
quickSort(arr);
console.log(arr);