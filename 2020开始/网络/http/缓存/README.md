## 缓存

缓存分为强制缓存和协商缓存

### 强制缓存
去浏览器的缓存里去找缓存文件使用

- Cache-Control: max-age=10

兼容低版本，用Expires，而且返回的状态码仍然是200    图片，logo这些都做强制缓存
- Expires: 绝对时间 

Cache-Control

### 协商缓存

### 强制不缓存
no-stroe表示的是不缓存
no-cache表示缓存但是每次都像服务器发请求

`Cache-Control: no-store`

Last-Modified
- 不够精确，如果最后修改时间变了，可是内容没有变就失效了(同一时间修改多次，修改保存后，又撤销重新保存)

Etag和If-None-Match比较