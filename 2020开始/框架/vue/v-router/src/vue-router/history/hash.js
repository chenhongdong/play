import History from './base';

export default class HashHistory extends History {
    constructor(router) {
        super(router);
        ensureSlash();
    }

    getCurrentLocation() {
        return getHash();
    }

    setupListener() {
        window.addEventListener('hashchange', () => {
            this.transitionTo(getHash());
        });
    }
}


function getHash() {
    return window.location.hash.slice(1);
}
// 确保有#/
function ensureSlash() {
    if (window.location.hash) return;
    window.location.hash = '/';
}