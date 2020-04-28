function Animal(type) {
    this.type = type;
    return {type: '中国人'};
}
Animal.prototype.fn = function() {
    console.log(this.type);
}

let a = simNew(Animal, '人类');
console.log(a.type);

function simNew() {
    // 拿到对应的类
    let Constructor = [].shift.call(arguments);
    // 返回的对象
    let obj = {};
    // 继承原型上的方法
    obj.__proto__ = Constructor.prototype;
    // 继承实例上的属性
    let r = Constructor.apply(obj, arguments);
    // 如果构造函数直接返回的是对象，那就直接返回。不是的话就返回obj对象
    return r instanceof Object ? r : obj;
}