let o = {a: 1, b: [1,2,3], c: 3}

Object.preventExtensions(o);    // 不能新增属性，可删可改

o.d = 4;
o.a = 'a';
o.b.push(4);
delete o.c;
console.log(o);