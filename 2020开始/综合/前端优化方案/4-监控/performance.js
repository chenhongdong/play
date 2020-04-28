// 通用性能打点
// 依赖jquery/zepto,monitor
function soPerfLog(options) {
    // 参数不全，直接返回
    (function() {
        if (!options || !options.pro || !options.pid) {
            return;
        }

        var opts = $.extend({
            q: '',
            hasTg: 0,
            resDomain: ['p.ssl.qhimg.com', 'hs.qhupdate.com', 's.360.cn', 's.qhupdate.com', 'e.tf.360.cn'],
            rate: 10
        }, options);

        var isWebkit = /webkit/gi.test(navigator.userAgent) ? 1 : 0;
        var rate = (opts.rate > 0 && opts.rate <= 100) ? opts.rate / 100 : 0.1;

        if (isWebkit && window.performance && Math.random() < rate) {
            var readyTime = 0,
                renderTime = 0,
                onloadTime = 0,
                imgCount = 0,
                cssCount = 0,
                jsCount = 0,
                tagCount = 0;

            $(window).on('load', function() {
                var timing = performance.timing;
                readyTime = timing.responseEnd - timing.responseStart;
                renderTime = timing.domComplete - timing.domLoading;
                onloadTime = timing.loadEventStart - timing.navigationStart;
                tagCount = $('*').length;

                // 用来存储（已配）外链资源数量
                var resArr = [];
                // 其他外链资源
                var resElseArr = [];
                var resElseObj = {}; //用来标记是否已存

                var entries = window.performance.getEntries();

                // 资源总量
                var len = entries.length;
                for (var i = 0; i < len; i++) {

                    var entry = entries[i];
                    var name = entry.name;

                    if (entry.entryType === 'resource') {
                        // 统计资源数量
                        if (/\.js$/.test(name)) {
                            jsCount++;
                        } else if (/\.css/.test(name)) {
                            cssCount++;
                        } else if (/\.(?:jpg|png|webp|gif|jpeg)(?:$|\?)/i.test(name)) {
                            imgCount++;
                        }

                        var rdLen = opts.resDomain.length;

                        if (rdLen) {
                            for (var j = 0; j < rdLen; j++) {
                                var rd = opts.resDomain[j];
                                if (name.indexOf(rd) != -1) {
                                    // 按配置中的domain查找
                                    resArr.push(rd + ',' + entry.duration.toFixed(0));
                                    opts.resDomain.splice(j, 1);
                                    break;
                                } else {
                                    if (j == rdLen - 1 && !resElseObj[name] && resElseArr.length < 6) {
                                        // 遍历完，存储其他的外部资源时间
                                        resElseArr.push(name + ',' + entry.duration.toFixed(0));
                                        resElseObj[name] = true;
                                    }
                                }
                            }
                        }
                    }
                }

                var url = location.protocol + '//s.qhupdate.com/sou/visit_duration.gif';
                monitor.setConf('perfUrl', url);

                // 发送打点
                monitor.log({
                    pro: opts.pro,
                    pid: opts.pid,
                    mod: 'perf',
                    domain: document.domain,
                    q: opts.q,
                    ob: opts.hasOnebox,
                    tg: opts.hasTg,
                    img: imgCount,
                    tag: tagCount,
                    js: jsCount,
                    css: cssCount,
                    resource: len,
                    ready: readyTime,
                    render: renderTime,
                    load: onloadTime,
                    resDomain: '',
                    resTime: ''
                }, 'perf', [], true);
            });
        }
    })();
}