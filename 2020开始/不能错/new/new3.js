function Cat(name) {
    this.name = name;
}
Cat.prototype.nickname = '小黑';


let cat = newMe(Cat, '小白');
console.log(cat.nickname);

function newMe(Super, ...args) {
    let obj = Object.create(Super.prototype);
    let res = Super.call(obj, ...args);
    if ((res !== null && typeof res === 'object') || typeof res === 'function') {
        return res;
    }
    return obj;
}

function create(proto) {
    function Fn() {}
    Fn.prototype = proto;
    return new Fn();
}