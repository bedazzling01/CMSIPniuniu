/**
 * webpack utils
 * 基础信息配置
 * 工具方法提供
 */
const AppConfig = require("../src/app.config.json");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const APP_COMMON_CONFIG = AppConfig.COMMON_CONFIG; //项目常规配置
const CompatibleConfig = AppConfig.CompatibleConfig;
const path = require("path");
const fs = require("fs");
const glob = require("glob");
const base64encode = require("./encrypt.js").base64encode; //开发信息加密
const ROOT_PATH = path.resolve(__dirname, ".."); //根目录
const EVENT = process.env.npm_lifecycle_event || ""; //npm_lifecycle_event返回当前正在运行的脚本名称
//插件基本信息,通过npm_package_前缀，可以拿到package.json里的字段
const softInfo = `
  ${process.env.npm_package_name} 
  ${process.env.npm_package_description}\n
  @version v${process.env.npm_package_version}
  @homepage ${process.env.npm_package_homepage}
  @repository ${process.env.npm_package_repository_url}\n
  (c) 2022 51ideal
  Released under the MIT License.
  hash:[hash]
`;
//判断是否在执行某个脚本
function hasNpmFlag(flag) {
  return EVENT.includes(flag);
}
/**
 * 获取package.json配置web入口使用的端口
 */
function getPackageConfigPort() {
  return process.env.npm_package_config_port || 4400;
}
//返回默认的端口,如果不指定port则使用默认端口。
function getNpmPort() {
  return process.env.npm_package_config_port || 3000;
}
//判断是否有摸个参数
function hasProcessFlag(flag) {
  return process.argv.join("").indexOf(flag) > -1;
}
/**
 * 当前是否开是webpack-dev-server服务器
 */
function isWebpackDevServer() {
  return process.argv[1] && !!/webpack-dev-server/.exec(process.argv[1]);
}
/**
 * 定义构建基础元数据
 */
function createDefaultMeta() {
  const hrm = hasProcessFlag("hot")
    ? hasProcessFlag("hot")
    : process.env.npm_package_config_hot == 1
    ? true
    : false; //是否热更新
  const hrmOnly = hasProcessFlag("hot")
    ? hasProcessFlag("hot")
    : process.env.npm_package_config_hotOnly == 1
    ? true
    : false;
  const host = process.env.HOST || "localhost";
  const port = process.env.PORT || getPackageConfigPort();
  const public = process.env.PUBLIC_DEV || host + ":" + port;
  const openPage = process.env.PAGE_DEV || "index.html";
  /**
   * 开发者信息
   */
  const headerInfo = (() => {
    let info = "";
    let keys = Object.keys(AppConfig.DeveloperInfo);
    if (keys && keys.length > 0) {
      keys.forEach((key) => {
        info = `${info}${key}:${AppConfig.DeveloperInfo[key]} `;
      });
    }
    info = base64encode(info);
    info = `<!--${info}-->`;
    return info;
  })();
  const routes = resolveRoutes();
  return {
    title: APP_COMMON_CONFIG.title,
    description: APP_COMMON_CONFIG.description,
    baseUrl: "/",
    isDevServer: isWebpackDevServer(),
    hrm,
    hrmOnly,
    host,
    port,
    public,
    openPage,
    watch: hasProcessFlag("watch"),
    headerInfo,
    script: AppConfig.SCRIPT_VENDORS,
    css: AppConfig.CSS_VENDORS,
    prerender: AppConfig.PRE_RENDER,
    routes,
  };
}

//定位root
//const root = path.join.bind(path, ROOT);
const root = path.join.bind(path, ROOT_PATH);
/***
 * @param enableCompress disabling compress could improve the performance,
 */
function getTerserOptions(enableCompress) {
  const isDebug = hasProcessFlag("debug");
  console.log("isdebug=", isDebug);
  const terserCompressOptions = isDebug
    ? {
        passes: 2, // buildOptimizer
        warnings: false, // remove warnings
      }
    : {
        passes: 2, // buildOptimizer
        warnings: false, // remove warnings
        drop_console: true, // console
        drop_debugger: true, //移除debugger
        pure_funcs: ["console.log"], // remove console
      };
  return {
    ecma: undefined, //也可以用ecma：5
    warnings: false, // TODO verbose based on option?
    parse: {},
    ie8: false,
    mangle: true,
    toplevel: false,
    compress: enableCompress ? terserCompressOptions : false,
    output: {
      ascii_only: true,
      comments: false,
    },
  };
}

/**
 * 获取自定义参数
 */
function getDefinedFlag(flag) {
  const target = process.argv.find((val, index) => {
    return val.indexOf(flag) > -1;
  });
  if (target) {
    const tempArr = target.split("=");
    return tempArr[1];
  }
  return null;
}

/**
 * css加载配置
 */
function postcssConfig(sty, device) {
  let pluginArr = [require("postcss-preset-env"), require("autoprefixer")];
  if (
    sty === "less" &&
    (device === "mobile" || CompatibleConfig.cssUnit === "rem")
  ) {
    pluginArr.push(
      require("postcss-pxtorem")({
        rootValue: 100,
        unitPrecision: 3,
        propWhiteList: [],
      })
    );
  } else if (
    sty === "css" &&
    (device === "mobile" || CompatibleConfig.cssUnit === "rem")
  ) {
    pluginArr.push(
      require("postcss-pxtorem")({
        rootValue: 50,
        unitPrecision: 3,
        propWhiteList: [],
      })
    );
  }

  return pluginArr;
}

function cssLoaderConfig(isprod, device) {
  if (isprod) {
    return [
      MiniCssExtractPlugin.loader,
      "css-loader",
      {
        loader: "postcss-loader",
        options: {
          postcssOptions: {
            plugins: postcssConfig("css", device),
          },
        },
      },
    ];
  }
  return [
    "style-loader",
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: postcssConfig("css", device),
        },
      },
    },
  ];
}

function lessLoaderConfig(isprod, device) {
  if (isprod) {
    return [
      MiniCssExtractPlugin.loader,
      "css-loader",
      {
        loader: "postcss-loader",
        options: {
          postcssOptions: {
            plugins: postcssConfig("less", device),
          },
        },
      },
      {
        loader: "less-loader",
        options: {
          webpackImporter: true,
        },
      },
    ];
  }
  return [
    "style-loader",
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: postcssConfig("less", device),
        },
      },
    },
    {
      loader: "less-loader",
      options: {
        // webpackImporter: true
      },
    },
  ];
}

/**
 * vue加载
 */
function loadVueConfig() {
  return [
    // "cache-loader",
    {
      loader: "vue-loader",
      options: {
        compilerOptions: {
          preserveWhitespace: false, // 不想让元素和元素之间有空格
        },
        //   babelParserPlugins: [
        //     'jsx',
        //     'classProperties',
        //     'decorators-legacy'
        //   ]
      },
    },
  ];
}

/**
 * js-loader选项
 */
function selectJsLoader(options) {
  options = options || {
    babel: true,
    eslint: true,
  };
  const jsLoaderArr = [];
  if (options.babel) {
    jsLoaderArr.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: "babel-loader",
    });
  }
  if (options.eslint) {
    jsLoaderArr.push({
      test: /\.(js|jsx|vue)$/,
      loader: "eslint-loader",
      enforce: "pre", //编译前检查
      exclude: /(node_modules)/,
      include: [root("src")], //指定检查的目录
      options: {
        //这里的配置项参数将会被传递到 eslint 的 CLIEngine
        formatter: require("eslint-friendly-formatter"), // 指定错误报告的格式规范
        fix: true,
      },
    });
  }
  return jsLoaderArr;
}
/**
 * 配置全局变量-根据当前构建环境定义全局变量
 */
/**
 * 配置全局变量-根据当前构建环境定义全局变量
 */
function getDefineList(options) {
  let definedEnv = {
    //定义全局变量
    "process.env.ENV": JSON.stringify(options.metadata.env),
    "process.env.HMR": options.hrm,
    __VUE_OPTIONS_API__: "true",
    __VUE_PROD_DEVTOOLS__: "false",
  };
  if (options.metadata.env === "development") {
    const NEW_DEV_ENV = {};
    const devEnv = AppConfig.DevEnv;
    for (let i in devEnv) {
      NEW_DEV_ENV[`process.env.${i}`] = devEnv[i];
    }
    definedEnv = Object.assign(definedEnv, NEW_DEV_ENV);
  } else if (options.metadata.env === "production") {
    const NEW_PROD_ENV = {};
    const prodEnv = AppConfig.ProdEnv;
    for (let i in prodEnv) {
      NEW_PROD_ENV[`process.env.${i}`] = prodEnv[i];
    }
    definedEnv = Object.assign(definedEnv, NEW_PROD_ENV);
  }
  return definedEnv;
}
/**
 * web开发html配置
 */
function htmlPluginOptions(metadata) {
  const entryPoints = ["inline", "vendor", "main"];
  const isProd = metadata.env === "production";
  const meta = {
    description: metadata.description,
  };
  return {
    template: root("src/template/index.html"),
    filename: "index.html",
    title: metadata.title,
    //   chunksSortMode: function(a, b) {
    //       return entryPoints.indexOf(a.names[0]) - entryPoints.indexOf(b.names[0]);
    //   },
    chunksSortMode: "auto",
    meta,
    headerInfo: metadata.headerInfo,
    css: metadata.css,
    script: metadata.script,
    isDevServer: metadata.isDevServer,
    hrmOnly: metadata.hrmOnly,
    inject: "body",
    hash: true,
    //chunks: entryPoints,
    xhtml: true,
    minify: isProd
      ? {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
        }
      : false,
  };
}

/**
 * 分离css
 */
function MiniCssExtra(isProd) {
  if (!isProd) {
    return [
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
        chunkFilename: "css/[name].css",
      }),
    ];
  } else {
    return [
      new MiniCssExtractPlugin({
        filename: "css/[name].[hash].css",
        chunkFilename: "css/[name].[chunkhash].css",
      }),
    ];
  }
}
class File {
  /**
   * 写入文件
   * @param {*} dir
   * @param {*} data
   * @returns
   */
  static async writeFile(dir, data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(dir, data, (err) => {
        if (err) {
          console.log("err=", err);
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }

  /**
   * 文件是否存在
   * @param {*} dir
   */
  static isFile(dir) {
    try {
      const stat = fs.statSync(dir);
      return stat.isFile();
    } catch (e) {
      return false;
    }
  }

  /**
   * 读取文件
   */
  static readFile(dir) {
    return new Promise((resolve, reject) => {
      fs.readFile(dir, { flag: "r+", encoding: "utf8" }, (err, data) => {
        if (err) {
          console.log("err=", err);
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * 修改文件
   */
  static async modFile(dir, fun) {
    const cnt = await File.readFile(dir);
    if (cnt) {
      const replacedContent = fun(cnt);
      await File.writeFile(dir, replacedContent);
      return true;
    }
    return false;
  }

  static readImagesPath(sourcePath, preName) {
    const sourceFile = fs.readdirSync(sourcePath, {
      withFileTypes: true,
    });
    let list = [];
    if (!sourceFile || sourceFile.length == 0) {
      return [];
    }
    sourceFile.forEach((file) => {
      // console.log('aaaaaaaaaaaaaaaaa=', file.name);
      if (file.isDirectory()) {
        const targetPath = path.resolve(sourcePath, file.name);
        const result = File.readImagesPath(
          targetPath,
          `${preName}${file.name}/`
        );
        list = [...list, ...result];
      } else {
        if (/\.(jpg|jpeg|png|gif)$/.test(file.name)) {
          list.push(`${preName}${file.name}`);
        }
      }
    });
    return list;
  }

  /**
   * 获取配置数据
   * @param {*} data
   */
  static async getConfig(dir) {
    if (!dir) {
      throw new Error("缺少json文件路径");
    }
    return new Promise((resolve, reject) => {
      fs.readFile(dir, (err, data) => {
        if (err) {
          reject(err);
        } else {
          const config = JSON.parse(data.toString());
          resolve(config);
        }
      });
    });
  }

  /**
   * 写入json文件
   */
  static async writeConfig(dir, data) {
    if (!data || !dir) {
      throw new Error("缺少数据!");
    }
    return new Promise((resolve, reject) => {
      fs.writeFile(dir, data, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }
}

async function resolveSourceData() {
  let sourceList = [];
  if (CompatibleConfig.preloadImages) {
    sourceList = File.readImagesPath(root("src/static/images"), "images/");
  }
  const configJson = root("src/core/iframe/sourceData.json");
  const data = await File.getConfig(configJson);
  if (data) {
    data["sourceList"] = sourceList;
  }
  await File.writeConfig(configJson, JSON.stringify(data, "", "\t"));
  return true;
}

/**
 * 基本的js拆分
 */
function splitChunksOptions() {
  return {
    maxAsyncRequests: 5,
    cacheGroups: {
      default: false,
      vendors: false,
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        name: "vendor",
        chunks: "initial",
        priority: -10,
        reuseExistingChunk: true,
        minChunks: 1,
        minSize: 3000,
        enforce: true,
      },
      commons: {
        name: "inline",
        chunks: "all",
        priority: 10,
        minChunks: 2,
        maxInitialRequests: 5,
        reuseExistingChunk: true,
        minSize: 3000,
      },
    },
  };
}

/**
 * 批量处理路由文件，并整理路由
 */
function resolveRoutes() {
  let resolveData = [];
  const files = glob.sync(`src/app/pages/**/indexRoutes.js`);
  files.forEach((keyItem) => {
    // const name = keyItem.split('/').pop().replace(/\.js/g, '')
    const value = require(`../${keyItem}`);
    let dataItem;
    if (
      !value.default &&
      Object.prototype.toString.call(value) === "[object Object]"
    ) {
      const key = Object.keys(value)[0];
      dataItem = value[key];
    } else {
      dataItem = value.default;
    }
    resolveData = [...resolveData, ...dataItem.routes];
  });
  let isStart = false;
  resolveData = resolveData.map((item) => {
    if (item.path === "/") {
      isStart = true;
    }
    return item.path;
  });
  if (!isStart) {
    resolveData.unshift("/");
  }
  return resolveData;
}

exports.getPackageConfigPort = getPackageConfigPort;
exports.softInfo = softInfo;
exports.hasNpmFlag = hasNpmFlag;
exports.getNpmPort = getNpmPort;
exports.root = root;
exports.hasProcessFlag = hasProcessFlag;
exports.getTerserOptions = getTerserOptions;
exports.cssLoaderConfig = cssLoaderConfig;
exports.lessLoaderConfig = lessLoaderConfig;
exports.getDefinedFlag = getDefinedFlag;
exports.loadVueConfig = loadVueConfig;
exports.selectJsLoader = selectJsLoader;
exports.htmlPluginOptions = htmlPluginOptions;
exports.splitChunksOptions = splitChunksOptions;
exports.getDefineList = getDefineList;
exports.createDefaultMeta = createDefaultMeta;
exports.DEFAULT_METADATA = createDefaultMeta();
exports.File = File;
exports.resolveSourceData = resolveSourceData;
exports.MiniCssExtra = MiniCssExtra;
exports.resolveRoutes = resolveRoutes;
