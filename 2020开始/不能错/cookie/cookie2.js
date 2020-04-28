let Cookie = {
    getCookie(key) {
        let arr = document.cookie.match(new RegExp('(^| )' + key + '=([^;]*)(;|$)'));

        if (arr && arr.length) {
            return decodeURIComponent(arr[2]);
        }
        return null;
    },
    setCookie(key, value, opts = {}) {
        let arr = [];
        if (opts.httpOnly) {
            arr.push('httpOnly=true');
        }
        if (opts.maxAge) {
            arr.push(`max-age=${opts.maxAge}`);
        }
        if (opts.domain) {
            arr.push(`domain=${opts.domain}`);
        }
        if (opts.path) {
            arr.push(`path=${opts.path}`);
        }

        document.cookie = `${key}=${encodeURIComponent(value)}; ${arr.join('; ')}`;
    }
}