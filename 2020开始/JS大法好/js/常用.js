// Promise  把方法promise化
function promisify(fn) {
    return function() {
        return new Promise((resolve, reject) => {
            fn(...arguments, (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });
    }
}

