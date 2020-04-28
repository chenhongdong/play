
function readFile(data) {
    return data;
}


// async函数返回的是一个promise

async function read() {
    let age = await readFile(2020);
    return age;
}

read().then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
})

