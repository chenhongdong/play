let o = {a: 1, obj: {num: 2}, arr: [1,2]};
o.o = o;

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
o2.arr.push(3);
o2.obj.num = 99;
console.log(o, o2);