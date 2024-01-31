/**
 * axios配置封装，export一个实例对象
 * 为了不污染vue的全局，并没有将axios加入到vue的prototype，而是使用对象导入的形式进行局部调用。
 * 已经具备基础配置，大部分情况该文件不需要修改
 */
import axios from 'axios';
import qs from 'qs';
import {
  EventDispatcher
} from '@core/lib/i-toolkit/eventDispatcher.js';

class AxiosResover {
  constructor(options) {
    options = options || {};
    Object.assign(this, EventDispatcher.prototype);
    this.headers = options.headers || {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    this.baseURL = options.baseURL || ""; // 请求域名
    this.codes = options.codes || {};
    this.defaultConfig = options.defaults || {};
    this.init();
  }

  init() {
    axios.defaults.baseURL = this.baseURL;
    axios.defaults.headers = this.headers;
    // 请求拦截
    axios.interceptors.request.use((config) => {
      if (config && this.defaultConfig) {
        for (const item in this.defaultConfig) {
          const itemObj = Object.prototype.toString.call(this.defaultConfig[item]) === "[object Function]" ? this.defaultConfig[item]() : this.defaultConfig[item];
          if (config.data && config.data.constructor === FormData) {
            config.data.append(item, itemObj);
          } else if (config.method === 'post') {
            const _data = qs.parse(config.data);
            _data[item] = itemObj;

            config.data = qs.stringify(_data);
          } else if (config.method === 'get') {
            const _data = qs.parse(config.params);
            _data[item] = itemObj;
            config.params = _data;
          }
        }
      }
      return config;
    }, (err) => {
      return Promise.reject(err);
    });
    // 返回拦截
    axios.interceptors.response.use((response) => {
      const { url } = response.config;
      const { data } = response;
      const { code, info } = data;
      if (code === this.codes.OK) {
        return data;
      } else {
        this.dispatchEvent({ type: "RES-ERROR", data: { code, info, url } });
        // console.log('请求错误拦截:', info, response.data);
        return Promise.reject(data);
      }
    }, (err) => {
      // console.log('错误拦截');
      return Promise.reject(err);
      // return Promise.reject('错误2');
    });
  }

  http(config) {
    return axios(config);
  }

  // get-data
  getData(url, params) {
    return this.http({
      method: 'get',
      url,
      params
    });
  }

  // post-data
  postData(url, params, config) {
    params = params || {};
    const data = params.constructor === FormData ? params : qs.stringify(params);
    if (config) {
      return this.http(Object.assign({
        method: 'post',
        url,
        data
      }, config));
    }
    return this.http({
      method: 'post',
      url,
      data
    });
  }

  // put-data
  putData(url, params) {
    return this.http({
      method: 'put',
      url,
      data: params
    });
  }

  // del-data
  delData(url, params) {
    return this.http({
      method: 'delete',
      url,
      data: params
    });
  }

  // GET URL 导出表格使用
  getUrl(url, params) {
    if (params !== '') {
      let paramStr = '';

      for (const item in this.defaultConfig) {
        if (this.defaultConfig[item]) {
          params[item] = this.defaultConfig[item];
        }
      }

      for (const key in params) {
        if (params[key]) {
          paramStr += key + '=' + params[key] + '&&';
        }
      }
      // console.log('url:::::::::', `http:${axios.defaults.baseURL}${url}?${paramStr}`);
      return `${axios.defaults.baseURL}${url}?${paramStr}`;
    }
  }
}

export default AxiosResover;