let quickSort = (arr) => {
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

// arr[l...p-1] < arr[p] < arr[p+1...r]
function partition(arr, l, r) {
    const mid = Math.floor((l + r) / 2);
    swap(arr, l, mid);
    let v = arr[l], j = l;

    for (let i = j + 1; i <= r; i++) {
        if (arr[i] < v) {
            swap(arr, j + 1, i);
            j++;
        }
    }
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