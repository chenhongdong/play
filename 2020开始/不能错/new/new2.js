function Cat(name) {
    // 1.没返回值的情况
    // this.name = name;
    // 2.返回值是对象{}
    // return {
    //     name,
    //     age: 5
    // }
    // 3.返回值是函数
    return function() {
        return name;
    }
}
Cat.prototype.say = function() {
    console.log(this.name);
};

let cat = newMe(Cat, '小白吧');
// 1
// cat.say();

// 2
// console.log(cat.age, cat.name);

// 3
console.log(cat());

function newMe(Super,...args) {
    let self =Object.create(Super.prototype);
    let res = Super.call(self, ...args);
    if ((res !== null && typeof res === 'object') || typeof res === 'function') {
        return res;
    }
    return self;
}