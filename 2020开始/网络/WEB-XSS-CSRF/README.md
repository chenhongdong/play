### 如何应对XSS和CSRF攻击呢？
- XSS
一句话就是转义用户输入的内容，转义转义转义
- CSRF
第三方网站其实是拿不到用户cookie的，只要用户登录过，访问第三方网站，往服务器提交内容时自动带上了cookie

1. 验证码校验
    express可以用个svg-captcha生成验证码，后台进行校验
2. 判断来源 referer
    请求头里的referer判断来源，不一致的不处理
3. token
    服务端登录后会返回token，前后端拿着token进行匹配，一样的就可以