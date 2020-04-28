// typeof和instanceof的区别

console.log(typeof null);   // object
console.log(typeof function(){});  // function
console.log(typeof []);     // object


// typeof只能判断基本类型，对象类型返回的都是object


// Object.prototype.toString.call()可以判断具体是什么类型
// 缺点： 是只能判断已经存在的类型,不能判断某个变量是谁的实例的，不能判断自定义类型
class A {};
let a = new A();
console.log(Object.prototype.toString.call(a));    //[object Array]


// instanceof
// 只能判断实例，不能判断基本类型
console.log(a instanceof A);
console.log([] instanceof Object);
console.log('hi' instanceof String);

// [].__proto__ === Array.prototype;
// [].__proto__.__proto === Object.prototype
function instance(A, B) {
    B = B.prototype;
    A =A.__proto__;
    while(true) {
        if (A === null) {
            return false
        }
        if (A === B) {
            return true;
        }
        A = A.__proto__;
    }
}

// console.log(instance(a, Function));
