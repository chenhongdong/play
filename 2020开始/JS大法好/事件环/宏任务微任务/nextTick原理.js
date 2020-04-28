// 宏任务   UI线程  script脚本  setTimeout  setImmediate
// 微任务   Promise.then    MutationObserver


// vm.$nextTick(function(){}) 是一个异步方法

/* 
    定义了一个timerFunc变量就是传到$nextTick里的回调函数

    1. 如果支持Promise就直接用Promise的then方法，Promise.then是微任务，代码执行快一些
    2. 如果不是IE就用MutationObserver，优先级比Promise低一些
    3. 如果是IE，那就用setImmediate是宏任务
    4. 最后是setTimeout
*/


