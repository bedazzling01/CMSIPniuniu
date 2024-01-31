import { Button,message,Form,ConfigProvider } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
const vendors=[Button,Form,ConfigProvider];
const uiVendors={
  install(app){
    vendors.map((component)=>{
      app.use(component);
    });
    app.config.globalProperties.$message = message;
  }
}; 
export default uiVendors;