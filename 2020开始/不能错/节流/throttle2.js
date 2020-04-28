function throttle(fn, time) {
    let timer, flag = true;

    return () => {
        if (flag) {
            fn.apply(this, arguments);
            flag = false;
            return;
        }

        if (timer) return;

        timer = setTimeout(() => {
            clearTimeout(timer);
            timer = null;
            fn.apply(this, arguments);
        }, time);
    }
}