import createRouteMap from './create-route-map';
import {createRoute} from './history/base';

export default function createMatcher(routes) {

    // 动态添加路由
    let { pathList, pathMap } = createRouteMap(routes);

    function addRoutes(routes) {
        createRouteMap(routes, pathList, pathMap);
    }
    // 匹配路径
    function match(location) {
        let record = pathMap[location];
        let local = {path: location}
        // 找到记录，就根据这个路由记录去创建匹配的路由
        if (record) {
            return createRoute(record, local)
        }

        return createRoute(null, local);
    }

    return {
        addRoutes,
        match
    }
}