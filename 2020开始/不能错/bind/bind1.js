Function.prototype.bind2 = function(context, ...args) {
    return (...newArgs) => {
        return this.call(context, ...args, ...newArgs);
    }
}

const obj = {
    a: 'obj-a',
    b: 'obj-b'
};

function fn() {
    console.log(this.a);
    return this.a;
}

let f = fn.bind2(obj);
f();


function Cat(name, age) {
    this.name = name;
    this.age = age;
}
Cat.prototype.say = function() {
    return '我是' + this.name + '今年' + this.age + '岁了'
};
Cat.prototype.fav = '看鸟';


Function.prototype.bind3 = function(context, ...args) {
    let self = this;
    let bound = function(...newArgs) {
        context = this instanceof self ? self : context;
        return self.apply(context, [...args, ...newArgs]);
    }
    bound.prototype = Object.create(self.prototype);
    return bound;
};

let C = Cat.bind3(null, '小白');
let cat = new C(5);
console.log(cat.fav, cat.say());

console.log(cat instanceof Cat, cat instanceof C);