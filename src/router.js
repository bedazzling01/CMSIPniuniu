// import {createRouter,createWebHashHistory} from 'vue-router';
import {
  routesAssign,
  resolveRoutes
} from '@core/iframe';
// 获取routes配置
const routesContext = require.context('./app', true, /indexRoutes.js$/);
// 整合路由配置，并根据id进行排序
const resolveData = resolveRoutes(routesContext).map((item) => {
  return item.routes;
});
// 整合全部路由
let routes = routesAssign(resolveData);
// 整理出菜单项目
const MenuData = routes.filter((item) => {
  //return item.meta && !item.meta.noLogin && item.meta.navsetter;
  return item.meta &&  item.meta.navsetter;
});
console.log('MenuData=', MenuData);
routes = [...routes, ...[{
  path: '/',
  redirect: '/index'
}]];

export {
  routes,
  MenuData
};