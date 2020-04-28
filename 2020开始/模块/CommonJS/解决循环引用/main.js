let a = require('./a');
let b = require('./b');     // b模块在a.js中加载过了，就不会再加载了，直接取缓存里的exports属性了

console.log('main文件', a.done, b.done);


// 模块的循环引用时，就只输出已经执行了的部分，未执行的不输出

/* 
    a.js文件
    exports.done = false;       // 只输出这一行代码，遇到循环引用前的已经执行了的代码
    let b = require('./b');     // require就是去模块里取exports的值
*/