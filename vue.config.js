const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './', // 基本路径
  outputDir: 'dist', // 输出文件目录
  assetsDir: "static", //放置生成的静态文件目录（js css img）
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件

    devServer: {
      host: "localhost",
      proxy: {
          '^/rollcall': {
              target: 'http://localhost:9002/', //接口域名
              changeOrigin: true,             //是否跨域
              ws: true,                       //是否代理 websockets
              secure: false,                   //是否https接口
              pathRewrite: {                  //路径重置
                  '^/rollcall': '/rollcall'
              }
          }
      }
  },
})
