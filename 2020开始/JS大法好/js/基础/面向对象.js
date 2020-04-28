// let jay = {name: 'Jay Chou', age: 41};

function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.eat = function() {
    console.log('吃')
}
// 模拟new的实现
function _new(className, ...args) {
    let obj = {};
    obj.__proto__ = className.prototype;
    className.call(obj, ...args);
    return obj;
}
let jay = _new(Person, 'Jay Chou', 41);
// 实例才有__proto__；类才有prototype

// __proto__ 隐式原型
// jay.__proto__.eat();
// 可以简写去掉__proto__
jay.eat();


console.log(Person.prototype.__proto__ === Object.prototype);

// 特殊的地方1
//     Function.__proto__ === Function.prototype
// 特殊的地方2
//     Object.__proto__ === Function.prototype
// 函数的祖宗还是Function
// Object的祖宗是null
