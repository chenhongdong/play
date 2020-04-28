let Cookie = {
    getCookie(key) {
        let arr = document.cookie.match(new RegExp('(^| )' + key + '=([^;]*)(;|$)'));

        if (arr && arr.length) {
            return decodeURIComponent(arr[2]);
        }
        return null;
    },
    setCookie(key, value, options = {}) {
        let arr = [];
        if (options.httpOnly) {
            arr.push('httpOnly=true');
        }
        if (options.maxAge) {
            arr.push(`max-age=${options.maxAge}`);
        }

        console.log(arr);
        
        document.cookie = `${key}=${encodeURIComponent(value)}; ${arr.join('; ')}`
    }
}