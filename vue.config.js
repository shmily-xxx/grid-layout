const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    open: false,
    proxy: null,
    // proxy: { //目的是解决跨域，若测试环境不需要跨域，则不需要进行该配置
    //   '/api': { // 拦截以 /api 开头的url接口
    //     target: 'https://api.taobao.cn/', //目标接口域名
    //     changeOrigin: true, //是否跨域
    //     ws: true, //如果要代理 websockets，配置这个参数
    //     secure: false, // 如果是https接口，需要配置这个参数
    //     pathRewrite: { // 标识替换
    //       '^/api': ''   //重写接口 后台接口指向不统一  所以指向所有/
    //     }
    //   }
    // }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'src': '@',
        'assets': '@/assets',
        'components': '@/components',
        'api': '@/api',
        'views': '@/views',
      }
    }
  }
});
