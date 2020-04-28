function Dog(name) {
    // this.name = name;
    // return {
    //     name,
    //     age: 5
    // }
    return function() {
        return name
    }
}
Dog.prototype.say = function() {
    console.log(this.name);
};

let dog = newMe(Dog, '狗狗');
// dog.say();
// console.log(dog.name, dog.age);
console.log(dog());

function newMe(Super, ...args) {
    let self = Object.create(Super.prototype);
    let result = Super.call(self, ...args);
    if ((result !== null && typeof result === 'object') || typeof result === 'function') {
        return result;
    }
    return self;
}