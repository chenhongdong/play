function read(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data);
        }, 1000);
    })
}

function write(data) {
    return data;
}

let asyncFn = async function () {
    let a = await read('武汉加油');
    let b = await write('~加油武汉');

    return a + b;
}

asyncFn().then(data => {    // 返回一个promise，then方法接收返回值
    console.log(data)
});

// 错误处理
async function f() {
    // 写到try/catch中的代码，不会中断后面await的执行
    try {
        await Promise.reject('不要干了');
    } catch (e) { }

    let a = await read('读心术');
    let b = await 123;
    // throw new Error(a + '错');

    return a + b;
}

f().then(
    v => console.log(v),
    // e => console.log(e)
)
    .catch(e => {   // 用catch不会报错，只会打印错误的结果
        console.log('我是真的 ' + e);
    })



class Sleep {
    constructor(timeout) {
        this.timeout = timeout;
    }
    then(resolve, reject) {
        const startTime = Date.now();
        setTimeout(
            () => resolve(Date.now() - startTime),
            this.timeout
        );
    }
}

(async () => {
    const sleepTime = await new Sleep(1000);
    console.log(sleepTime);
})();



// sleep休眠
function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
    });
}

async function reallySleep() {
    for (let i = 0; i < 5; i++) {
        console.log(i);
        await sleep(1000);
    }
}

reallySleep();


function fetch(url) {
    let res = [];
    function text() {
        res.push(url);
        return res;
    }
    return new Promise((resolve, reject) => {
        resolve({text});
    })
        
}
// 并行顺序异步加载
async function logInOrder(urls) {
    // 并发读取远程URL
    const textPromises = urls.map(async url => {
        const response = await fetch(url);
        return response.text();
    });

    // let result = await Promise.all(textPromises);
    // console.log(result);

    // 按次序输出  等同于上面的Promise.all
    for (const textPromise of textPromises) {
        console.log(await textPromise);
    }
}

let urls = ['www.baidu.com', 'www.so.com', 'www.jd.com', 'www.tmall.com'];
logInOrder(urls);