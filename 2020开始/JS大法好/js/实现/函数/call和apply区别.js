/* 
    call和apply
    都可以让函数执行并且改变函数里的this指向
    call 参数是依次传入
    apply 参数是以数组的形式传入


    性能比较
    call性能更好，apply还需要对传入的数组进行展开，所以会更慢些
*/

Function.prototype.call = function(obj, ...args) {
    const context = Object(obj) || window;
    const fn = Symbol();    // Symbol可以保证唯一性，不会覆盖对象里原来的属性
    context[fn] = this;   // 给对象加个临时属性fn，指向当前函数
    const result = context[fn](...args);   // 执行得到返回值
    // 删除临时属性fn
    delete context[fn];
    // 返回执行的结果
    return result;
};

Function.prototype.apply = function(obj, args) {
    const context = Object(obj) || window;
    const fn = Symbol();
    context[fn] = this;
    const result = context[fn](...args);
    delete context[fn];
    return result;
};

function sum(amount, amount2) {
    console.log(this.age + amount + amount2);
}
let obj = {age: 10};
sum.call(obj, 90, 50);
sum.apply(obj, [90, 50]);