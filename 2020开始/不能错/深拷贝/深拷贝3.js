let o = {a: 1, obj: {age: 18}, arr: [1,2,3]};
o.o = o;    // 循环引用的情况

function deepClone(obj, map = new Map()) {
    if (typeof obj === 'object') {
        if (map.has(obj)) {
            return map.get(obj);
        }
        let data = Array.isArray(obj) ? [] : {};
        map.set(obj, data);

        for (let k in obj) {
            data[k] = deepClone(obj[k], map);
        }
        return data;
    }

    return obj;
}

let o2 = deepClone(o);
o2.arr.shift();
o2.obj.name = 'bmw';
console.log(o, o2);