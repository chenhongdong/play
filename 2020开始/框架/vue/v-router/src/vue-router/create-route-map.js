// 创建路由映射表，扁平化路由数据
export default function createRouteMap(routes, list, map) {
    let pathList = list || [];
    let pathMap = map || Object.create(null);

    routes.forEach(route => {
        addRouteRecord(route, pathList, pathMap);
    });

    return {
        pathList,
        pathMap
    }
}

function addRouteRecord(route, pathList, pathMap, parent) {
    let path = parent ? `${parent.path}/${route.path}` : route.path;
    let record = {
        path,
        component: route.component,
        parent,
        redirect: route.redirect
    };
    if (!pathMap[path]) {
        pathList.push(path);
        pathMap[path] = record;
    }

    if (route.children) {
        route.children.forEach(childRoute => {
            addRouteRecord(childRoute, pathList, pathMap, record);
        });
    }
}