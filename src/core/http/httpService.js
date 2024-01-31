/**
 * 项目接口处理服务，使用配置好的axios实例进行请求，
 * 均使用静态方法，返回一个promise
 * 如果接口加多，可以根据业务新怎多个接口处理服务
 */
import AxiosResover from '@core/http/axiosResolver';
import {
  getUserToken
} from '@core/http/httpUtils';
import {
  rootURL,
  RES_CODE
} from '@core/constants/index';

const AxiosConfig = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  baseURL: rootURL + '/index.php',
  defaults: {
    token: () => { return getUserToken(); }
  },
  codes: RES_CODE
};
console.log('=======AxiosConfig========', AxiosConfig, getUserToken);

const AxiosService = new AxiosResover(AxiosConfig);
AxiosService.addEventListener("RES-ERROR", (e) => {
  console.log('res-error:', e);
  if (e.data.code === RES_CODE.ERROR) {
    // 根据需要 删除token或进行其他操作
  }
});

/**
 * 注意:HttpService中只定义公共接口的处理方法，各模块接口方法，请在各独立api目录下定义，并继承HttpService
 */
const publicAPI = {
  // 公共接口，注意公共接口无需加baseURL，在baseAxiosS中已经设定了axios.defaults.baseURL = baseURL;
  // 如果请求的接口域或地址不同，可以在处理方法中定制
  // 示例：getToken:'/getToken'
  configList: '/middle/common/dd',
  uploadImg: '/admin/index/fileUpload',
  editBanner: '/admin/index/operationBanner',
  delBanner: '/admin/index/delBanner'
};
class HttpService {
  // 全局值列表
  static configList() {
    console.log('configList--------------------------------');
    return AxiosService.getData(publicAPI.configList, {});
  }

  static uploadImg(param = {}) {
    return AxiosService.postData(publicAPI.uploadImg, param);
  }

  static editBanner(param = {}) {
    return AxiosService.postData(publicAPI.editBanner, param);
  }

  static delBanner(param = {}) {
    return AxiosService.postData(publicAPI.delBanner, param);
  }
  /// /-常规示例-/////////////////////////////////////////////////
  // static getCommonTest(data){                               //
  //     return AxiosService.postData(api.getToken,data); //
  //    }                                                      //
  /// ////-常规示例-///////////////////////////////////////////////

  /// /-特定域名/请求地址示例-////////////////////////////////////////////
  // static getCommonTest(data){                                     //
  //    let config={defaults:{baseURL:'https://www.XXX.com/XXX' }};  //
  //     return AxiosService.postData(api.getToken,data,config);//
  //    }                                                            //
  /// ////-特定域名/请求地址示例-/////////////////////////////////////////
}
export { AxiosService, HttpService };