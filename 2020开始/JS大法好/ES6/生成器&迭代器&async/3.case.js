
let fs = require('mz/fs');
let path = require('path');
let url = path.join(__dirname, '1.txt');    // 文件读取绝对路径

function* read() {
    let one = yield fs.readFile(url, 'utf8');
    one = path.join(__dirname, '2.txt')
    let two = yield fs.readFile(one, 'utf8');
    let num = yield [two + '，挺住'];
    return num;
}

co(read()).then(data => {
    console.log(data);
})
// co库实现过程
function co(it) {
    return new Promise((resolve, reject) => {
        function next(val) {
            let {value, done} = it.next(val);

            if (done) {
                return resolve(value);
            }
            // 如果不是promise的结果，就包装为promise
            Promise.resolve(value).then(data => {
                next(data);
            }, reject);
        }
        next();
    });
}

/* let it = read();
let { value, done } = it.next();
value.then(data => {
    let {value, done} = it.next(path.join(__dirname, data));  // 第二次next把data的结果传过去，给one进行赋值
    value.then(data2 => {
        let {value, done } = it.next(data2); // 第三次next把data2的结果传给two
        Promise.resolve(value).then(data3 => {
            let {value, done} = it.next(data3);
            console.log(value);
        })
    })
}); */


// 把方法promise化
function promisify(fn) {
    return function() {
        return new Promise((resolve, reject) => {
            fn(...arguments, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    }
}
