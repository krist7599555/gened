const path = require("path");

module.exports = {
  devServer: {
    disableHostCheck: true,
    watchOptions: {
      poll: true
    },
    port: 9000,
    compress: true,
    proxy: {
      "/api": {
        target: "http://localhost:3124",
        public: "127.0.0.1:3124",
        secure: false,
        changeOrigin: true,
        headers: {
          Connection: "keep-alive"
        }
      }
      // "/api": {
      //   target: "http://[::1]:3124"
      // }
      // "/api": {
      //   target: "http://localhost:3124",
      //   ws: false,
      //   changeOrigin: true
      // },
      // "/api/**": {
      //   target: "http://localhost:3124",
      //   secure: false,
      //   changeOrigin: true
      // }
    }
  },

  pwa: {
    name: "gened",
    themeColor: "#DAB47D",
    msTileColor: "#35368A"
  },

  baseUrl: undefined,
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: true,
  productionSourceMap: undefined,
  parallel: undefined,

  css: {
    sourceMap: true
  }
};
