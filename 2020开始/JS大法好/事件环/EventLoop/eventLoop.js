// js  主线程是单线程  setTimeout,ajax,js模型还是多线程的

// 栈 后进先出

// 队列  先进先出

// let n = 0;
// while( n < 1000000) {
//     n += 100;
//     console.log(n);
// }
// setTimout第2个参数，表示的是最少延迟时间
// setTimeout(() => {
//     console.log('定时器')
// }, 1000);

// Promise.resolve().then(() => {
//     console.log('Promise')
// })

// 宏任务： ui线程， script脚本，setTimeout，
// 微任务： Promise.then

// 主栈执行完代码后，会去找宏任务队列取出一个执行，当宏任务执行完毕后，再去清空微任务，
// 无线循环上面的步骤，所以就叫事件环


setTimeout(() => {
    console.log('time1');
    Promise.resolve().then(() => {
        console.log('Promise1')
    })
});

Promise.resolve().then(() => {
    console.log('Promise2')

    setTimeout(() => {
        console.log('time2');
    });
})