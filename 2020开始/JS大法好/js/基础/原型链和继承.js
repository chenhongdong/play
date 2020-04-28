/* 
    __proto__属性组成的链条就叫原型链

    为什么要有原型链？
        实现属性和方法的共享！！！！！！！
*/

// let a = 1;
// // console.log(a.toString())
// console.log(Number.prototype.__proto__.toString());
// console.log(new Number(1).toString());





class Father {
    static staticFatherName = 'FatherName';
    static staticGetFatherName = function() {
        console.log(Father.staticFatherName);
    }
    constructor(name) {
        this.name = name;
    }
    getName() {
        console.log(this.name);
    }
}
// 继承
class Child extends Father {
    static staticChildName = 'ChildName';
    static staticGetChildName = function() {
        console.log(Child.staticChildName);
    }
    constructor(name, age) {
        super(name);
        this.age = age;
    }
    getAge() {
        console.log(this.age);
    }
}

let child = new Child('chd', 1);
child.getName();
child.getAge();
Child.staticGetChildName();
Child.staticGetFatherName();