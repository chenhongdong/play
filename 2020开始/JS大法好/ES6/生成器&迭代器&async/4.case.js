
let fs = require('mz/fs');
let path = require('path');
let url = path.join(__dirname, '1.txt');    // 文件读取绝对路径

async function read() {
    let one = await fs.readFile(url, 'utf8');
    one = path.join(__dirname, one);
    let two = await fs.readFile(one, 'utf8');
    let num = await [two + '，挺住'];
    return num;

}
// async函数返回一个promise  async+await可以try catch(异步是不能try catch)不过直接用catch捕获也可以
read().then(data => {
    console.log(data);
}).catch(e => {
    console.log(e);
})


// 1.callback  多个请求并非，不好管理，链式调用导致回调地狱
// 2.promise 优点： 优雅的处理异步，处理错误。 缺点： 基于回调的，还是会有嵌套问题
// 3.generator + co 让代码像同步，不支持try catch
// 4.async await    异步问题，支持try catch
