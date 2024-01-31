/**
 * 常量数据存储-和状态管理有区别
 * 常量数据只提供一个静态参照数据
 */
const webpage = require('@/app.config.json');
export const RES_CODE = {
  OK: '000000', /// ////////////////////////-res-code返回成功时状态码//
  ERROR: '000021'
};
// 整合配置信息，webpage的配置項主要针对构建，为了减少配置内容，会整合部分配置信息，项目内配置使用APP_CONFIG
export const APP_CONFIG = Object.assign({}, webpage.COMMON_CONFIG, webpage.VERSION);
const prefix = location.origin + location.pathname;
export const isprod = process.env.NODE_ENV === 'production';
export const TOKEN_NAME_KEY = prefix + "-app-token-name";/// token name存储别名
export const TOKEN = prefix + "-app-token";// token值存储别名
export const STORE = prefix + "-store";
export const rootURL = process.env.API_HOST; // -process.env.API_HOST在src/webpage-config.js内设置，构建时会根据环境调用//
export const ACCOUNT = "loc-account";/// ////////////-登录账号；
export const PASSWORD = "loc-password";/// ////////////-登录密码；
console.log('process=',process);
