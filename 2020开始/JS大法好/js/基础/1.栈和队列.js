/* 
    栈是一种数据结构
    后进先出 LIFO   
    生活中就像刷盘子一样
*/
class Stack {
    constructor() {
        this.items = [];
    }

    // 添加元素到栈顶
    push(ele) {
        this.items.push(ele);
    }
    // 取出栈顶元素
    pop() {
        return this.items.pop();
    }
}

let stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.pop());   // 3

function one() {
    function two() {
        function three() {
            debugger;
        }
        three();
        debugger;
    }
    two();
    debugger;
}
one();
// 系统栈调用顺序： three, two, one


/* 
    队列  先进先出
    就像排队买票一样，一个一个来，队首元素最先出
*/
class Queue {
    constructor() {
        this.items = [];
    }
    // 入队，元素从队尾插入
    enqueue(ele) {
        this.items.push(ele);
    }
    // 出队，队首出队
    dequeue() {
        return this.items.shift();
    }
}
let queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log(queue.dequeue());   // 1