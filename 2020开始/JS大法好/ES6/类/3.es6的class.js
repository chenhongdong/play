class Animal {
    static who() {
        return '你是谁';
    }
    constructor(name) {
        this.name = name;
        this.eat = '吃肉肉';
    }
    say() { // 原型上的方法
        console.log('你是什么动物', this.name);
    }
}
let a = new Animal('黑猩猩');
a.say()


class Tiger extends Animal {    // 继承实例+原型
    constructor(name) {
        super(name);        // 相当于Animal.call(this, name)
    }   
}
let tiger = new Tiger('大老虎');
console.log(Tiger.who());