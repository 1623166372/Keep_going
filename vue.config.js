module.exports = {
    // 基本路径
    publicPath: process.env.NODE_ENV === 'production' ? './': '/',

    // 输出文件目录
    outputDir: 'dist',
    // css相关配置
    pluginOptions: {
        'style-resources-loader': {
          preProcessor: 'scss',
          patterns: []
        }
      },
    // cli3 代理是从指定的target后面开始匹配的，不是任意位置；配置pathRewrite可以做替换
    devServer: {
        host: 'localhost',
        port: '8080',
        open: true,
        proxy: {
            '/api': {
                // /api 的意义在于，声明axios中url已/api开头的请求都适用于该规则，
                // 注意是以/api开头，即：axios.post({url: '/api/xxx/xxx'})
                target: 'http://admin-api.macrozheng.com',
                ws: true, // 允许webstocket
                changOrigin: true, //允许跨域
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
}
