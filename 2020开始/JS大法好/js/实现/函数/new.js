function Cat(name) {
    this.name = name;

    // return {    // 返回对象就以返回的为主
    //     name,
    //     age: 5,
    //     home: '哥哥'
    // }

    // return function() {
    //     return name;
    // }
} 

Cat.prototype.say = function() {
    console.log(this.name);
};


let cat = new Cat('小白')
// console.log(cat.home, cat.age, cat.name);
cat.say();
// console.log(cat());


function myNew(Super, ...args) {
    let self = Object.create(Super.prototype);
    let result = Super.call(self, ...args);
    console.log(result, self);
    if ((result !== null && typeof result === 'object') || typeof result === 'function') {
        return result;
    }

    return self;
}