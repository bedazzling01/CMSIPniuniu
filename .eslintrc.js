module.exports = {
    root: true, // 作用的目录是根目录
    extends: ["plugin:vue/base"], // 继承标准规则
    plugins: [
        'html', // 使用eslint-plugin-html
        'flowtype',
        'vue'
    ],
    "settings": {
        "flowtype": {
            "onlyFilesWithFlowAnnotation": true, // 只检查 声明 flow语法的文件
        }
    },
    //parser: 'vue-eslint-parser',
    parserOptions: {
        parser: "babel-eslint", //此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
        ecmaVersion: 2022,
        sourceType: 'module', // 按照模块的方式解析
        "ecmaFeatures": {
            "jsx": true
        }
    },
    env: {
        browser: true, // 开发环境配置表示可以使用浏览器的方法
        node: true, //
        commonjs: true,
        es6: true,
        amd: true
    },
    rules: {
        // 自定义的规则
        "linebreak-style": [0, "error", "windows"],
        "indent": ['error', 2], // error类型，缩进4个空格
        'space-before-function-paren': 0, // 在函数左括号的前面是否有空格
        'eol-last': 0, // 不检测新文件末尾是否有空行
        'semi': ['error', 'always'], // 必须在语句后面加分号
        //"quotes": ["error", "double"],// 字符串没有使用单引号
        "no-console": ["error", {
            allow: ["log", "warn"]
        }], // 允许使用console.log()
        //"arrow-parens": 0,
        "arrow-parens": ["error", "always"], //允许使用箭头函数
        "no-new": 0, //允许使用 new 关键字
        "quotes": 0, // 关闭全局变量检测
        "no-callback-literal": 0, //允许回调
        "no-extend-native": 0, //2禁止扩展native对象,1允许
        "no-unused-vars": ['error', {
            "vars": "all",
            "args": "after-used",
            "argsIgnorePattern": "^_"
        }], //不能有声明后未被使用的变量或参数
        "no-sparse-arrays": 0,
        "no-tabs": 0,
        "new-cap": 0,
        "vue/comment-directive": 0,
        //    "vue/multi-word-component-names":[
        //        "error",
        //        {ignores:["index"]}
        //    ]
        "vue/multi-word-component-names":[
            "off"
        ],
        "vue/no-v-for-template-key-on-child": 'off',
        "vue/no-v-for-template-key":"off",
        // "prettier/prettier":1 
    },
    globals: { // 允许全局变量,将$设置为true，表示允许使用全局变量$
        "document": true,
        "localStorage": true,
        "window": true,
        "jQuery": true,
        $: true
    }
}

/**
 * eslint 配置项
 *root 限定配置文件的使用范围
 *parser 指定eslint的解析器
 *parserOptions 设置解析器选项
 *extends 指定eslint规范
 *plugins 引用第三方的插件
 *env 指定代码运行的宿主环境
 *rules 启用额外的规则或覆盖默认的规则
 *globals 声明在代码中的自定义全局变量
 *rule 中规则的开启关闭：
 *“off” 或 0 - 关闭规则
 *“warn” 或 1 - 开启规则
 *“error” 或 2 - 开启规则
 */