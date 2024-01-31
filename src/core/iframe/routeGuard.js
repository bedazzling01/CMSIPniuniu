/**
 * 统一的路由守卫
 */
import {
  getUserToken
} from '@core/http/httpUtils';
import {useSystemStore} from '@core/store/systemStore'; 
function routeGuard(router, config) {
  config = config || {};
  const index = config.index || '/';
  const login = config.login || '/login';
  const systemStore=useSystemStore();
  router.beforeEach((to, from, next) => {
    console.log('to=', to, ' from.name=', from.name, 'to.path=', to.path); 
    const userToken = getUserToken();
    if (userToken === "") {
      systemStore.updateToken({data:''});
      systemStore.doLogOut; 
      if (to && to.meta && to.meta.noLogin === true) { // 如果不需要权限，则继续执行
        return next();
      }
      if (to.meta && !to.meta.noLogin && to.path !== login) {
        return next({
          path: login
        });
      }
      return next();
    } else {
      if (to.path === login) {
        return next({
          path: index
        });
      }
      return next();
    }
  }); 
}

export default routeGuard;