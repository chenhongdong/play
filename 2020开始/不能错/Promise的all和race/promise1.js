let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    }, 2000);
});
let p2 = new Promise((resolve) => {
    resolve(2);
});
let p3 = new Promise((resolve) => {
    setTimeout(() => {
        resolve(3);
    })
});



Promise.all = function(arr) {
    return new Promise((resolve, reject) => {
        let res = [];
        let index = 0;

        for (let i = 0; i < arr.length; i++) {
            let p = arr[i];
            p.then((data) => {
                res[i] = data;
                if (++index === arr.length) {
                    resolve(res);
                }
            }, reject);
        }
    })
};

Promise.race = function(arr) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < arr.length; i++) {
            let p = arr[i];
            p.then(resolve, reject);
        }
    });
}


Promise.all([p1, p2, p3]).then(data => {
    console.log(data);  // 1,2,3
})

Promise.race([p1, p2, p3]).then(data => {
    console.log(data);  // 2
})