import { defineStore} from 'pinia';
import { getUserToken, setUserToken } from '@core/http/httpUtils';
export const useSystemStore = defineStore('system', {
  state: () =>{
    return {
      token:getUserToken(), 
      logged: false
    };
  },
  getters: {
    getToken:(state)=>state.token,
    isLogged: (state) => state.logged // 获取登录状态 
  },
  actions: {
    updateToken({ data, remember }){
      this.token = data;
      const all = !!remember;
      setUserToken(data, all);
    },
    doLogIn: () => {
      this.logged = true;
    },
    doLogOut: () => {
      this.logged = false;
    }
  }
});