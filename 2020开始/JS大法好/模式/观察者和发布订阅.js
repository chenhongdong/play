// 观察者模式   vue   典型的观察者
// 观察者模式 包含  发布订阅

// 区别： 发布订阅   发布   和订阅是无关的，有个中间人来处理

// 观察者  和被观察者肯定是有关系的


class Subject { // 被观察者   小白
    constructor(name) {
        this.name = name;
        this.state = '睡觉';
        this.observers = [];
    }
    setState(state) {
        this.state = state;
        // 告诉所有的观察者状态改变
        this.observers.forEach(o => o.update(state));
    }
    // 注册观察者
    attach(obj) {
        this.observers.push(obj);
    }
}

class Observer { // 观察者  我
    constructor(name) {
        this.name = name;
    }
    update(state) {
        console.log(this.name + ':' + '小白最新的状态是：' + state);
    }
}
let me = new Observer('我');
let she = new Observer('小白的姐姐');
let cat = new Subject('小白');
cat.attach(me);
cat.attach(she);
cat.setState('饿了');