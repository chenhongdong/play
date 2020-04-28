## prefetch预加载
从网络层面来看，prefetch预加载是在用户需要前就将资源加载完毕

## DNS prefetch
如果访问`www.baidu.com`，dns解析的时候需要将域名转为ip，这个过程比较耗时

`DNS解析延迟较高，在手机的网络上更为明显。`

DNS prefetch分析访问百度需要的资源所需要的域名，浏览器空闲的时候就会提取将这些域名都转成ip，当真正请求资源时就避免了转化的过程

在图片较多的网页中，在图片请求前可以提前解析对应的域名，这样可以使图片加载速度提升至少5%

## 启用DNS预加载
```
<meta http-equiv="x-dns-prefetch-control" content="on">
```
## 预加载指定主机名
```
<link rel="dns-prefetch" href="//p.ssl.qhimg.com">
```