// 生成器会配合yield来使用，如果遇到yield就暂停执行
function * read() { 
    yield 1;
    yield 2;
    yield 3;
}

// 生成器返回的是迭代器，迭代器有next方法，调用next方法可以返回{value, done}, 
// value是当前数据的值，done是布尔表示遍历是否结束
let it = read();
console.log(it.next()); // { value: 1, done: false }
console.log(it.next()); // { value: 2, done: false }
console.log(it.next()); // { value: 3, done: false }
console.log(it.next()); // { value: undefined, done: true }





function * read() {
    let a = yield 1;
    console.log(a);
    let b = yield 2;
    console.log(b);
    let c = yield 3;
    console.log(c);
}
let it = read();
console.log(it.next());         // 第一次next是不能传递参数的
console.log(it.next('给a的参数值'));      // 第二次传的值是打印的a
console.log(it.next('给b的值'));
console.log(it.next('给c的值'));