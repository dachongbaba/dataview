const webpack = require('webpack');

module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        Popper: 'popper.js',
        moment: 'moment'
      }),
    ],
  },

  devServer: {
    proxy: 'http://docker.meixiu.mobi:58767'
  }
}