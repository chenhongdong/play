/* 
    寄生组合继承是最合理的，它解决了组合继承的两次new的过程

    通过Object.create创建父类的原型副本，并且把contructor指向子类

    赋给子类的prototype上

    组合还是Super.call(this, ...args)构造函数继承实例上的属性和方法
*/

function inherit(Sub, Super) {
    let proto = Object.create(Super.prototype);
    proto.constructor = Sub;
    Sub.prototype = proto;
}

function A(name) {
    this.name = name;
}
A.prototype.say = function() {console.log('saysay A');}

function B(name, sex) {
    A.call(this, name);
    this.sex = sex;
}

inherit(B, A);
// 需要先继承完后，再去子类的prototype上写方法，因为inherit里重写了子类的prototype
B.prototype.wow = function() {console.log('saysay B');}


let b = new B('小白', '男孩');
console.log(b.sex);
b.say();
b.wow()