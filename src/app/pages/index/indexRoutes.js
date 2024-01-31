/**
 * 生成的路由映射信息，有一个隐藏的6位数字属性，即refcode，默认情况下路由映射的refcode根据数据整理自动生成，
 * 其中id可以作为路由映射数组的第一级排序标识，如果缺省，则按照默认排序。
 * refcode也可以自定义
 */
exports.default = {
  id: 1, // 可以缺省，如果需要对路由进行排序，或设定路由code的前两位，可以设定mid,进行路由排序
  routes: [
    {
      path: "/index",
      name: "index",
      component: () => import("./index.vue"),
      meta: {
        noLogin: true, // 默认为true，可以缺省
        label: "首页",
        navsetter: {
          // 可缺省
          alias: "首页",
          icon: "icon-home",
        },
      },
    },
  ],
};
