let obj = {
    name: 'O1'
};
let obj2 = {
    name: 'O2'
};
let obj3 = {
    name: 'O3'
};

function a(name) {
    console.log(this.name)
}
a.prototype.say = function() {
    console.log('say',this.name);
}

let f1 = a.bind(obj2, '喵喵');
f1();
// ☆☆☆   bind如果绑定了this后，再对其绑定过的函数重新bind绑定this是不会改变的
let f2 = f1.bind(obj, '哈哈');
f2();
let f3 = new f1(obj3);
f3;

function fn(name, age) {
    console.log(this);
    // console.log(this.name + '养了一只' + name + '它今年' + age + '岁了');
}
fn.prototype.flag = '立志';
// 1.bind方法可以绑定this指向和参数
// 2.bind方法返回一个绑定后的函数(高阶函数)
// 3.如果绑定的函数被new了，当前函数的this就是当前的实例
// 4.new出来的结果可以找到原有类的原型

Function.prototype.bind2 = function (context) {
    let self = this;
    let args = Array.prototype.slice.call(arguments, 1);
    function bound() {  // this
        let newArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof bound ? this : context, args.concat(newArgs));
    }
    function Fn() {};   // Object.create原理
    Fn.prototype = this.prototype;
    bound.prototype = new Fn();
    return bound;
};

// Function.prototype.bind = function(context, ...args) {
//     return (...innerArgs) => this.call(context, ...args, ...innerArgs);
// }

let bindFn = fn.bind2(obj, '猫');
let ins = new bindFn(123);
console.log(ins.flag);



