const path = require("path");
// const webpack = require("webpack");
// const UglifyJsPlugin = require("uglifyjs-3-webpack-plugin");

// const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  filenameHashing: false,
  runtimeCompiler: true,
  chainWebpack: config => {
    config.output.chunkFilename(`js/[name].[chunkhash:8].js`);
  },
  configureWebpack: {
    plugins: [
      // new TerserPlugin({
      //   parallel: true,
      //   terserOptions: {
      //     ecma: 6
      //   }
      // })
      // new UglifyJsPlugin({
      //   uglifyOptions: {
      //     warnings: false,
      //     ie8: false,
      //     compress: true,
      //     mangle: true,
      //     output: {
      //       comments: false
      //     }
      //   }
      // })
    ],
    optimization: {
      minimize: true,
      splitChunks: {
        minSize: 100000,
        maxSize: 500000
      }
    }
  },
  devServer: {
    disableHostCheck: true,
    watchOptions: {
      poll: true
    },
    port: 9000,
    compress: true,
    hot: true,
    open: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3124",
        secure: false,
        changeOrigin: true,
        headers: {
          Connection: "keep-alive"
        }
      }
    }
  },
  pwa: {
    name: "gened",
    themeColor: "#DAB47D",
    msTileColor: "#35368A"
  },
  css: {
    sourceMap: true
  }
};
