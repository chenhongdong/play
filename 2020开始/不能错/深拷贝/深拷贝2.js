let o = {a: 1, obj: {age: 18}, arr: [1,2,3]};

function deepClone(obj, map = new Map()) {
    if (typeof obj === 'object') {
        if (map.has(obj)) {
            return map.get(obj);
        }
        let data = Array.isArray(obj) ? [] : {};
        map.set(obj, data);

        for (let key in obj) {
            data[key] = deepClone(obj[key], map);
        }
        return data;
    }
    return obj;
}

let o2 = deepClone(o);
o2.arr.pop();
o2.obj.age=19;
console.log(o, o2);