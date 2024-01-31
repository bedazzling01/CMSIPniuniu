/**
 * webpack prod
 * 生产环境配置
 */
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const utils = require("./webpack.utils");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
// const PrerenderSPAPlugin = require('@dreysolano/prerender-spa-plugin');
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
module.exports = async function (options) {
  const ENV = (process.env.ENV = process.env.NODE_ENV = "production");
  const METADATA = Object.assign(utils.DEFAULT_METADATA, {
    env: ENV,
  });
  const baseConfig = await commonConfig({
    isProd: true,
    metadata: METADATA,
  });
  // const PrerenderSPA=()=>{
  //   if(METADATA.prerender){
  //     //const routes=utils.resolveRoutes();
  //     const pagestr=METADATA.routes.join(',');
  //     return  [new PrerenderSPAPlugin({
  //       staticDir:utils.root('dist'),
  //       routes:METADATA.routes,  // 路由这块根据自己的路由改写
  //       postProcess (renderedRoute) {
  //         console.log('--= originalRoute=',renderedRoute.originalRoute,"route=",renderedRoute.route);
  //         //变更base
  //         renderedRoute.html=renderedRoute.html.replace(/(<meta[^<>]*name=\"author\"[^<>]*>)/ig, `${METADATA.headerInfo}`);
  //         renderedRoute.html=renderedRoute.html.replace(/(<meta[^<>]*name=\"page\"[^<>]*>)/ig, `<meta name="page" content="${renderedRoute.route}">`);
  //         return renderedRoute
  //       },
  //       renderer: new Renderer({
  //         injectProperty: '__PRE_RENDER',
  //         inject: {
  //           from: '51job',
  //           doing:true
  //         },
  //         navigationOptions: {
  //           timeout: 0,
  //         },
  //         headless: true,
  //         renderAfterDocumentEvent: 'render-event',
  //         renderAfterTime: 5000
  //       })
  //     })]
  //   }else{
  //     return []
  //   }
  // }
  return merge(baseConfig, {
    mode: "production",
    devtool: false,
    output: {
      path: utils.root("dist"),
      globalObject: "this",
      publicPath: "",
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin(utils.htmlPluginOptions(METADATA)),
      // ...PrerenderSPA(),
      new TerserPlugin({
        parallel: true, // 多进程
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ["console.log"], // 移除console
          },
        },
      }),
    ],
    optimization: {
      minimize: true, //启动压缩
      usedExports: true, //只导出被使用的模块
    },
  });
};
