// 实现原理就是将Generator函数和自执行器包装在一个函数里

function fn(args) {
    return spawn(function* () {});
}



function spawn(genF) {
    return new Promise((resolve, reject) => {
        const gen = genF();

        step(() => gen.next(undefined));

        function step(nextF) {
            let next;
            try {
                next = nextF;
            } catch (e) {
                return reject(e);
            }

            if (next.done) {
                return resolve(next.value);
            }

            Promise.resolve(next.value).then(v => {
                step(() => gen.next(v));
            }, e => {
                step(() => gen.throw(e));
            })
        }
    });
}






// 类似的题
async function printOrder(urlArr) {
    let promise = urlArr.map(async url => {
        let res = await fetch(url);
        return res.text();
    });
    console.log(promise);
    for (let p of promise) {
        await p;
    }
}

printOrder(['www.baidu.com', 'www.so.com', 'www.jd.com']);