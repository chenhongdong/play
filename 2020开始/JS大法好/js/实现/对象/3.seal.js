let o = {a: 1, b: [1,2,3], c: 3}

Object.seal(o);  // 密封    不能增不能删，可改

delete o.c;
o.d = 4;
o.b.shift();
console.log(o);