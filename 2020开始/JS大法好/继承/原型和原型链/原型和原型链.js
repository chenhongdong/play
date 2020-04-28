// 原型 prototype   原型链  __proto__
// 每一个函数都有prototype属性
// 每一个对象都有__proto__属性

function Dog() {
    this.type = '哈士奇';
}

Dog.prototype.type = '柯基';
Dog.prototype.name = function() {
    return this.type;
}

let dog = new Dog();

console.log(dog.__proto__ === Dog.prototype); // 原型链指向的就是当前类的原型
console.log(Dog.prototype.__proto__ === Object.prototype)
console.log(Object.prototype.__proto__);    // 顶级对象就是Object

// hasOwnProperty只查看实例上是否有这个属性
console.log(dog.hasOwnProperty('type'));
console.log('type' in dog);  

// 特殊的是Function和Object的原型链都是Function.prototype
console.log(Function.__proto__ === Function.prototype);
// Object也是new Function创建出来的
console.log(Object.__proto__ === Function.prototype);