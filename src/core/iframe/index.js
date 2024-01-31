/**
 * 将多个源路由数组拼合整理后返回
 * @param arg
 */
function routesAssign(...arg) {
  if (arg.length === 0) return [];
  let list = [];
  if (arg.length === 1 && Object.prototype.toString.call(arg[0]) === '[object Array]') {
    list = Array.prototype.slice.call(arg[0]);
  } else {
    list = Array.prototype.slice.call(arg);
  }
  console.log('---list=', list);
  let result = [];
  list.forEach((arr) => {
    if (Object.prototype.toString.call(arr) !== '[object Array]') {
      result.push(arr);
    } else {
      const len = result.length + 1;
      const first = len < 10 ? `0${len}` : `${len}`;
      for (let i in arr) {
        const item = arr[i];
        i = parseInt(i) + 1;
        const second = i < 10 ? `0${i}` : `${i}`;
        if (item && item.meta && (!item.meta.refcode || item.meta.refcode === "") && (item.path !== "/" && item.path !== "")) {
          item.meta.refcode = `${first}${second}00`;
        }
        if (item && item.children) {
          for (let j in item.children) {
            const sub = item.children[j];
            if (sub && sub.meta && (!sub.meta.refcode || sub.meta.refcode === "") && (sub.path !== "/" && sub.path !== "")) {
              j = parseInt(j) + 1;
              const third = j < 10 ? `0${j}` : `${j}`;
              sub.meta.refcode = `${first}${second}${third}`;
            }
          }
        }
      }
      result = [...result, ...arr];
    }
  });
  console.log("====result===", result);
  return result;
}

/**
 * 导航路由筛选
 */
function filterMenuRoutes(routes) {
  let result = [];
  if (!routes || Object.prototype.toString.call(routes) !== '[object Array]') return result;
  routes.forEach((route) => {
    console.log('route=', route);
    const newRoute = Object.assign({}, route);
    if (newRoute.meta && newRoute.meta.navsetter) {
      if (newRoute.children) {
        const children = newRoute.children;
        newRoute.children = children.filter((item) => {
          return item.meta && item.meta.navsetter;
        });
      }
      result.push(newRoute);
      console.log("result===", result);
    } else {
      if (newRoute.children) {
        const children = newRoute.children;
        const newChildren = children.filter((item) => {
          return item.meta && item.meta.navsetter;
        });
        if (newChildren.length > 0) {
          result = [...result, newChildren];
        }
      }
    }
  });
  console.log("************8result===", result);
  return result;
}
/**
 * 批量处理获取的route映射信息
 * 根据路由映射数组的id进行排序
 * @param {*} routesContext
 */
function resolveRoutes(routesContext) {
  const resolveData = [];
  const rctx = (routesContext.keys()).filter((item) => {
    return /^\.\//.test(item);
  });
  rctx.forEach((item) => {
    const routeData = routesContext(item);
    console.log('routeData=',routeData);
   
    let dataItem;
    if(!routeData.default && Object.prototype.toString.call(routeData) === '[object Object]'){
      const key=Object.keys(routeData)[0];
      dataItem=routeData[key]; 
    }else{
      dataItem=routeData.default;
    }
   
    console.log('dataItem=',dataItem);
    resolveData.push(dataItem);
  });
  if (resolveData.length > 1) {
    resolveData.sort((a, b) => {
      return a.id - b.id;
    });
  }
  return resolveData;
}
/**
 * 整合状态，凡事以Store.js结尾的文件都认为是状态管理文件，进行统一整合
 * @param {*} storeContext
 */
function resolveStores(storeContext) {
  let moduleData = {};
  let defaultData = null;
  storeContext.keys().forEach((item) => {
    const storeData = storeContext(item);
    const dataItem = storeData.default || storeData;
    // resolveData.push(dataItem);
    if (dataItem) {
      if (dataItem.namespaced === true) {
        if (dataItem.moduleName && dataItem.moduleName !== "") {
          moduleData[dataItem.moduleName] = dataItem;
        } else {
          moduleData = {
            ...moduleData,
            dataItem
          };
        }
      } else {
        const {
          state,
          getters,
          mutations,
          actions
        } = dataItem;
        if (defaultData === null) {
          defaultData = {
            state,
            getters,
            mutations,
            actions
          };
        } else {
          defaultData.state = Object.assign(defaultData.state, state);
          defaultData.getters = Object.assign(defaultData.getters, getters);
          defaultData.mutations = Object.assign(defaultData.mutations, mutations);
          defaultData.actions = Object.assign(defaultData.actions, actions);
        }
      }
    }
  });

  moduleData = defaultData
    ? {
      ...moduleData,
      defaultData
    }
    : moduleData;
  return moduleData;
}

export {
  routesAssign,
  filterMenuRoutes,
  resolveRoutes,
  resolveStores
};