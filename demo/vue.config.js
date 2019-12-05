module.exports = {
  // 选项...
  publicPath: process.env.NODE_ENV === "production" ? "/yuhao/" : "/",
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require("postcss-px2rem")({
            remUnit: 57
          })
        ]
      }
    }
  }
};
