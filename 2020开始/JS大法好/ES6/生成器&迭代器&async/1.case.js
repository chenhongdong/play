
let obj = {0:1,1:2,2:3,length:3, [Symbol.iterator]: function * () {
    // 每次浏览器都会不停的调用next方法，把yield的结果作为值
    let index = 0;
    while(index !== this.length) {
        yield this[index++]
    }
}};

function arg() {
    let arr = [...obj];
    console.log(arr);
}

arg(1,2,3,4,5);