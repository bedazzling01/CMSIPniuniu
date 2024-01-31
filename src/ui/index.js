const componentsContext = require.context('@ui/widget', true, /\.js$/);
console.log('-componentsContext.keys=', componentsContext.keys());
let components = [];
if (components.length === 0 && componentsContext) {
  componentsContext.keys().forEach((item) => {    
    if (item === './index.js' || item === './uiVendors.js') return;
    const componentConfig = componentsContext(item);
    const component = componentConfig.default || componentConfig;
    console.log('--',component);
    components.push(component);
  });
 
  const res = new Map();
  components=components.filter((item)=>{   
    return !res.has(item['name']) && res.set(item['name'], 1);
  });
  console.log(components);
}
const install = function(app) {
  if (install.installed) return;
  install.installed = true; 
  components.map((component)=>{
    app.use(component);
  });
};
export default install;
