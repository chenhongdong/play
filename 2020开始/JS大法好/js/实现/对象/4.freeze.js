let o = {a: 1, b: [1,2,3], c: 3, d: {name: '杰克'}}

Object.freeze(o);   // 冻结 属性不能增删改

o.e = 4;
o.a = 'a'
delete o.c;

o.d.age = 99;

for (let k in o) {
    if (typeof o[k] === 'object') {
        Object.freeze(o[k]);
    }
}

o.d.age = 100;

console.log(o);
