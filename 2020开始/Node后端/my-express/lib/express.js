// 真正express文件夹

// 创建应用

const Application = require('./application');
const Router = require('./router');

function createApplication() {
    // 创建应用核心就是new Application
    return new Application
}
createApplication.Router = Router;

module.exports = createApplication;