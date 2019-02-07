module.exports = {
  devServer: {
    proxy: "http://localhost:3124",
    compress: true,
    port: 9000
  }
};
