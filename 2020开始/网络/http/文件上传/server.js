const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

Buffer.prototype.split = function(sep) {
    const len = Buffer.from(sep).length;
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

http.createServer((req, res) => {
    let {pathname} = url.parse(req.url);

    // 上传文件开发
    if (pathname === '/upload' && req.method === 'POST') {
        if (req.headers['content-type'].includes('multipart/form-data')) {
            // 边界
            let boundary = '--' + req.headers['content-type'].split('=')[1];
            let arr = [];
            req.on('data', data => {
                arr.push(data);
            });
            req.on('end', () => {
                // 观察二进制数据，可以得出通过boundary来进行分割
                // console.log(Buffer.concat(arr).toString());

                const content = Buffer.concat(arr); // 二进制数据
                const lines = content.split(boundary).slice(1, -1); // 分割每行的数据
                const obj = {}; // 数据对象

                lines.forEach(line => {
                    let [head, body] = line.split('\r\n\r\n');
                    let h = head.toString();
                    let key = h.match(/name="(.+?)"/)[1];

                    if (h.includes('filename')) {
                        // 文件的上传
                        // 计算主体内容开始的位置，slice截取的是head的长度加上4个字节的换行
                        let buffer = line.slice(head.length + 4);
                        // uuid给文件生成一个唯一的id值，防止别人传了同样的文件名覆盖掉
                        let filename = uuid.v4();
                        let filepath = path.resolve(__dirname, 'upload', filename);
                        // 写入文件，上传到服务器
                        fs.writeFileSync(filepath, buffer);
                        // 获取文件的大小，通过fs.statSync
                        let statObj = fs.statSync(filepath);

                        // 多文件上传是把数据放入数组内
                        let result = obj[key] || (obj[key] = []);

                        result.push({
                            filename,
                            filepath,
                            size: statObj.size
                        });
                    } else {
                        // 文本内容上传
                        obj[key] = body.toString().slice(0, -2);
                    }
                });

                res.end(JSON.stringify(obj));
            });
        }
        return;
    }

    // 静态服务
    let filepath = path.join(__dirname, pathname);
    fs.stat(filepath, (err, statObj) => {
        if (err) {
            sendErr(res);
        }

        if (statObj.isFile()) {
            fs.createReadStream(filepath).pipe(res);
            return;
        } else {
            sendErr(res);
        }
    });
}).listen(3001);

function sendErr(res) {
    res.statusCode = 404;
    res.end();
    return;
}