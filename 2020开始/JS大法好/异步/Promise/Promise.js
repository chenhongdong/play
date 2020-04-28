// executor执行函数
function Promise(executor) {
    this.status = 'pending';
    this.value = null;
    this.reason = null;
    this.onFulfilledCb = [];
    this.onRejectedCb = [];

    function resolve(value) {
        if (this.status === 'pending') {
            this.status = 'fulfilled';
            this.value = value;
            this.onFulfilledCb.forEach(fn => fn());
        }
    }

    function reject(reason) {
        if (this.status === 'pending') {
            this.status = 'rejected';
            this.reason = reason;
            this.onRejectedCb.forEach(fn => fn());
        }
    }

    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (value) { return value };
    onRejected = typeof onRejected === 'function' ? onRejected : function (err) { return err };
    let promise2;   // 链式调用
    if (this.status === 'fulfilled') {

        promise2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onFulfilled(this.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            })
        });
    }
    if (this.status === 'rejected') {
        promise2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onRejected(this.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            }); 
        });
    }

    // 异步的时候status一开始还处于pending
    if (this.status === 'pending') {
        promise2 = new Promise((resolve, reject) => {
            this.onFulfilledCb.push(() => {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch(e) {
                        reject(e);
                    }
                });
            });
    
            this.onRejectedCb.push(() => {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch(e) {
                        reject(e);
                    }
                });
            });
        })
    }
};

function resolvePromise(p, x, resolve, reject) {
    if (p === x) {
        return reject(new TypeError('循环引用'))
    }
    let flag;

    if (x !== null && (typeof x === 'function' || typeof x === 'object')) {
        try {
            let then = x.then;  // x也是个promise所以有then方法

            if (typeof then === 'function') {
                then.call(x, (data) => {
                    if (flag) return;
                    flag = true;
                    // data可能还是一个promise,继续递归解析直到得到个普通值
                    resolvePromise(p, data, resolve, reject);
                }, (e) => {
                    if (flag) return;
                    flag = true;
                    reject(e);
                });
            } else {
                resolve(x);
            }
        } catch (e) {
            if (flag) return;
            flag = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}

// catch
Promise.prototype.catch = function(callback) {
    return this.then(null, callback);
}

// all
Promise.all = function (arr) {
    return new Promise((resolve, reject) => {
        let res = [];
        let num = 0;
        let len = arr.length;

        for (let i = 0; i < len; i++) {
            arr[i].then(data => {
                res[i] = data;
                if (++num === len) {
                    resolve(res);
                }
            }, reject);
        }
    })
};

// race
Promise.race = function(arr) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < arr.length; i++) {
            arr[i].then(resolve, reject);
        }
    });
};

// resolve
Promise.resolve = function(value) {
    return new Promise((resolve) => {
        resolve(value);
    });
};

// reject
Promise.reject = function(reason) {
    return new Promise((resolve, reject) => {
        reject(reason);
    })
}