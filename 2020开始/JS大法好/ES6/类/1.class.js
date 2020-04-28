function Animal(name) {
    // 属性 分为两种  实例上的属性  公有属性
    this.name = name;
    this.arr = [1,2,3];
}
// 原型上的是公有的属性和方法
Animal.prototype.address = {location: '山里'};

let a1 = new Animal('猴子');
let a2 = new Animal('老虎');
console.log(a1.arr === a2.arr); // 实例属性都是私有的， false
console.log(a1.address === a2.address);    // 公有属性 true
// 每个实例都有__proto__原型链，指向类的原型prototype
console.log(a1.__proto__ === Animal.prototype); // true
console.log(a1.constructor === Animal);     // true

console.log(Animal.__proto__ === Function.prototype);   // true
console.log(a1.__proto__.__proto__ === Object.prototype);   // true
console.log(Object.prototype.__proto__);    // null到头了