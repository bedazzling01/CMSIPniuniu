import {
  TOKEN
} from '@core/constants/index';
import Storage from '@core/lib/storage';
/**
 * 获取tokenname
 */
export const loadTokenName = (openName) => {
  if (!openName) return TOKEN;
  const sessionTokenName = Storage.getSessionItem(openName);
  const localTokenName = Storage.getLocalItem(openName);
  const tokenName = sessionTokenName || localTokenName || TOKEN;
  return tokenName;
};
/**
 * 获取token
 */
export const getUserToken = (openName) => {
  const tokenKey = loadTokenName(openName);
  return Storage.getSessionItem(tokenKey) || Storage.getLocalItem(tokenKey) || '';
};
/**
 * token存储
 */
export function setUserToken(val, all) {
  const tokenKey = loadTokenName();
  Storage.setSessionItem(tokenKey, val);
  if (all) {
    Storage.setLocalItem(tokenKey, val);
  }
  return true;
}
/**
 * token清理
 */
export function cleanUserToken() {
  const tokenKey = loadTokenName();
  Storage.remove(tokenKey);
  return true;
}