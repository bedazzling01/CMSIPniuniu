/**
 * webpack common
 * 公共配置
 */
const utils = require("./webpack.utils");
const webpack = require("webpack");
//const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const CopyWebpackPlugin = require("copy-webpack-plugin");

//const smp = new SpeedMeasurePlugin();
module.exports = async function(options) {
    await utils.resolveSourceData();
    const METADATA = Object.assign({},
        utils.DEFAULT_METADATA,
        options.metadata || {}
    ); //配置元数据
    const isProd = options.isProd || false;
    //返回一个配置对象
    //return smp.wrap({
    return {
        entry: { mian: `./src/main.js` },
        output: {
            path: utils.root("dist"), //output dir
            clean: true, //清理dist中的多于文件
            // Specifies the name of each output file on disk.
            filename: "js/[name].[chunkhash].bundle.js",
            // The filename of the SourceMaps for the JavaScript files.
            sourceMapFilename: "js/[file].map",
            //The filename of non-entry chunks as relative path
            chunkFilename: "js/[name].[chunkhash].chunk.js",
        },
        // watch: true,
        target: "web",
        mode: "none",
        optimization: {
            runtimeChunk: "single", //如果不设置可能会让热更新失效
            splitChunks: utils.splitChunksOptions(), //js拆分
            usedExports: true,
        },
        // Options affecting the resolving of modules.
        resolve: {
            extensions: [".js", ".json", ".styl", ".stylus", ".vue", ".less", ".mjs"],
            modules: [utils.root("src"), utils.root("node_modules")],
            alias: Object.assign({}, {
                vue: utils.root("node_modules/vue/dist/vue.esm-bundler.js"),
                "@": utils.root("src"),
                "@core": utils.root("src/core"),
                "@template": utils.root("src/template"),
                "@ui": utils.root("src/ui"),
                "@static": utils.root("src/static"),
                images: utils.root("src/static/images"),
                font: utils.root("src/static/font"),
            }),
        },
        module: {
            rules: [
                ...utils.selectJsLoader({
                    babel: true,
                    eslint: true,
                }),
                {
                    test: /\.mjs$/,
                    include: /node_modules/,
                    type: "javascript/auto",
                },
                {
                    test: /\.vue$/,
                    use: utils.loadVueConfig(),
                },
                {
                    test: /\.less$/i,
                    use: utils.lessLoaderConfig(isProd, null),
                },
                {
                    test: /\.css$/,
                    use: utils.cssLoaderConfig(isProd, null),
                },
                {
                    test: /\.art$/,
                    use: {
                        loader: "art-template-loader",
                        options: {},
                    },
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/,
                    use: {
                        loader: "url-loader",
                        options: {
                            limit: 1000,
                            publicPath: "../",
                            name: "[path][name].[ext]",
                            context: utils.root("src/static/"),
                            esModule: false,
                        },
                    },
                },
                {
                    test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
                    use: {
                        loader: "url-loader",
                        options: {
                            limit: 1000,
                            publicPath: "../",
                            name: "[path][name].[ext]",
                            context: utils.root("src/static/"),
                            esModule: false,
                        },
                    },
                },
                {
                    test: /\.(mp3|ogg|wav|mpeg4)([\?]?.*)$/,
                    use: {
                        loader: "url-loader",
                        options: {
                            limit: 1000,
                            publicPath: "../",
                            name: "[path][name].[ext]",
                            context: utils.root("src/static/"),
                            esModule: false,
                        },
                    },
                },
            ],
        },
        cache: {
            //配置缓存机制
            type: "filesystem",
            cacheDirectory: utils.root("node_modules/.cac/webpack"),
        },
        plugins: [
            new VueLoaderPlugin(),
            new webpack.ProvidePlugin({
                process: "process/browser",
            }),
            new webpack.DefinePlugin(utils.getDefineList(options)),
            new CopyWebpackPlugin({
                patterns: [{
                        from: "images",
                        to: "images",
                        context: "src/static/",
                        noErrorOnMissing: true,
                    },
                    {
                        from: "font",
                        context: "src/static/",
                        to: "font",
                        noErrorOnMissing: true,
                    },
                    {
                        from: "media",
                        context: "src/static/",
                        to: "media",
                        noErrorOnMissing: true,
                    },
                    {
                        from: "**.js",
                        context: "src/static/vendors/",
                        to: "js",
                        noErrorOnMissing: true,
                    },
                    {
                        from: "**.css",
                        context: "src/static/vendors/",
                        to: "css",
                        noErrorOnMissing: true,
                    },
                ],
            }),
            ...utils.MiniCssExtra(isProd), //分离css
        ],
    };
    //);
};