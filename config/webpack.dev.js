
/**
 * webpack dev
 * 开发环境配置
 */
const webpack=require('webpack');
const {merge}=require('webpack-merge');
const commonConfig= require('./webpack.common.js');
//const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const utils=require('./webpack.utils');
module.exports= async function(options){
  const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
  const METADATA = Object.assign(utils.DEFAULT_METADATA, {
    env: ENV
});
  const baseConfig=await commonConfig({metadata:METADATA});
  return merge(baseConfig,{
    mode: 'development',
    devtool:'cheap-module-source-map',
    //dev
    devServer:{
      port:utils.getNpmPort(),
      hot:true,//热加载并自动刷新
      host:'localhost',
      historyApiFallback:{
        rewrites:[{ from: /^\/$/, to: '/index.html' }] 
      },
    },
    plugins:[
     // new CleanWebpackPlugin(),
      // new webpack.DefinePlugin({
      //   __VUE_OPTIONS_API__: 'true',
      //   __VUE_PROD_DEVTOOLS__: 'false'
      // }),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin(utils.htmlPluginOptions(METADATA)),
 
    ]
  });
}
