const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
const uuid = require('uuid');

http.createServer((req, res) => {
    let { pathname } = url.parse(req.url);

    // 文件上传部分
    if (pathname === '/upload' && req.method === 'POST') {
        if (req.headers['content-type'].includes('multipart/form-data')) {
            let arr = [];
            req.on('data', data => {
                arr.push(data);
            });

            req.on('end', () => {
                const content = Buffer.concat(arr); // 二进制数据
                const boundary = '--' + req.headers['content-type'].split('=')[1];  // 边界
                const lines = content.split(boundary).slice(1, -1); // 每行分割出来的内容，分为头和体
                let obj = {};   // 存储对象
                lines.forEach(line => {
                    let [head, body] = line.split('\r\n\r\n');
                    let h = head.toString();
                    let key = h.match(/name="(.+?)"/)[1];
                    console.log(h);

                    if (h.includes('filename')) {
                        let extension = h.match(/filename="(.+?)"/)[1].split('.')[1];   // 文件扩展名
                        console.log(extension);
                        // 上传的是文件
                        // 计算主体内容开始的位置，是从头的长度+4个换行符\r\n\r\n
                        let main = line.slice(head.length + 4);
                        let filename = uuid.v4();
                        let filepath = path.resolve(__dirname, 'upload', filename + '.' + extension);
                        // 上传到服务器写入文件
                        fs.writeFileSync(filepath, main);
                        // 检查文件目录信息
                        let statObj = fs.statSync(filepath);
                        // 考虑到还有多文件上传，需要将obj[key]创建为一个结果数组来保存数据
                        let result = obj[key] || (obj[key] = []);
                        result.push({
                            filename,
                            filepath,
                            size: statObj.size
                        });
                    } else {
                        // 表单文本内容
                        // slice(0,-2)是为了把主体内容的\r\n字符去掉
                        obj[key] = body.toString().slice(0, -2);
                    }
                });

                res.end(JSON.stringify(obj));
            });
        }
    }

    // 静态服务
    let filepath = path.join(__dirname, pathname);
    fs.stat(filepath, (err, statObj) => {
        if (err) {
            sendErr(res);
        }

        // 如果文件存在的话
        if (statObj.isFile()) {
            fs.createReadStream(filepath).pipe(res);
            return;
        } else {
            sendErr(res);
        }
    });
}).listen(5000);


Buffer.prototype.split = function (sep) {
    let len = Buffer.from(sep).length;
    let cur;
    let offset = 0;
    let arr = [];

    while ((cur = this.indexOf(sep, offset)) !== -1) {
        arr.push(this.slice(offset, cur));
        offset = cur + len;
    }
    arr.push(this.slice(offset));
    return arr;
};

function sendErr(res) {
    res.statusCode = 404;
    res.end();
    return;
}