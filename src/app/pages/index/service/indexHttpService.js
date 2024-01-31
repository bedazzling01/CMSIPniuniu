import { AxiosService, HttpService } from '@core/api/http-service';
/**
 * 当前模块的接口地址集合
 */
const indexApi = {
  detail: '/admin/project/detail'

}; 
/**
 * 当前模块对外的接口服务方法
 */
class indexHttpS extends HttpService {
  // 项目-详情
  static detail(params = {}) {
    return AxiosService.getData(indexApi.detail, params);
  }
}

export default indexHttpS;