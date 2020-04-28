/* 
ES5的继承： 创造子类的实例对象this，把父类的属性和方法都添加到this上，
           Super类.call(this, arguments)

ES6的继承： 先将父类的属性和方法加到this上(必须先调super方法，不然在new的时候会报错)，
           再在子类的contructor中修改this
*/

class Parent {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    static hello() {
        console.log('hello world');
    }
    say() {
        return this.name + '__' + this.age;
    }
};

class Child extends Parent {
    constructor(name, age, sex) {
        // 表示父类的构造函数，返回子类Child的实例
        super(name, age);       // super方法继承了父类的属性和方法
        this.sex = sex;
    }
}

let child = new Child('小白', 5, '男孩');
console.log(child.say());

console.log(Object.getPrototypeOf(Child))