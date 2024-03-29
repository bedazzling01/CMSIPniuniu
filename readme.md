## smw Project Starter Vue3

> #### app.config.json 配置文件变更说明

- CompatibleConfig.preloadImages 用于配置是否预加载所有的图片素材，设为 true,构建时则会读取 src/static/images 目录下所有的图片文件，并进行预加载，预加载结束后，loading 动画才消失。

- COMMON_CONFIG.title 配置统一的页面标题
- COMMON_CONFIG.description 配置统一的页面描述
- CSS_VENDORS 配置需要插入到页面 head 标签内的 css 样式文件
- SCRIPT_VENDORS 配置需要插入到页面 head 标签内的 js 样式文件

---

> #### 开发目录说明

- src/app 主要业务逻辑开发目录，可以根据需要新增子目录 可以通过@app 别名进行定位

- src/core 主要针对整个开发构建环境的功能整合，一般不需要修改

- src/static 静态资源文件目录 包含：字体、图片、媒体、样式或其他第三方插件

- src/template 页面模板

- src/ui 包含第三方 ui 框架的组件引入、已经全局自定义组件。所有在 src/ui/widget 目录下面的组件，需要单独目录，并且每个子目录要有 index.js 将组件导出。所有位于 src/ui/widget 目录下面的组件均会进行全局注册。如果不需要全局注册，请将组件放置于 src/app/components 下。

> #### 启动命令

- npm run start 启动开发环境

- npm run build:prod 启动生产构建环境
