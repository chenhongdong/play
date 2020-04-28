function Animal(name) {
    this.name = name;
    this.eat = '吃肉肉';
}
Animal.prototype.address = {location: '山里'};
Animal.prototype.say = function() {
    console.log('说出你是什么动物');
}

function Tiger(name) {
    // 1. 继承父类实例上的属性
    Animal.call(this);
    this.name = name;
    this.age = 10;
}
// 2. 原型继承公共方法和属性    缺点：不能给父类传参数
// Tiger.prototype = new Animal();  
// 3. 继承父类的公共方法|属性  __proto__是高级浏览器才支持的
// Tiger.prototype.__proto__ = Animal.prototype;
// 高级浏览器下用Object.setPrototypeOf也可以
// Object.setPrototypeOf(Tiger.prototype, Animal.prototype);
// console.log(Object.getPrototypeOf(Tiger.prototype))


// 4. 通过Object.create继承公共方法|属性
// Object.create实现
function create(prototype) {
    function Fn(){}
    Fn.prototype = prototype;
    return new Fn();
}
// constructor需要指定Tiger，不然指的是父级的Animal
Tiger.prototype = Object.create(Animal.prototype, {constructor: {value: Tiger}});
// Tiger.prototype = create(Animal.prototype);
// Tiger.prototype.constructor = Tiger;


Tiger.prototype.todo = function() {
    console.log('老虎说');
}

let tiger = new Tiger('东北虎');
console.log(tiger.constructor);
tiger.say()