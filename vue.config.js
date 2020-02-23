const webpack = require('webpack');
var baseUrl = '';
module.exports = {
  publicPath: baseUrl,
  runtimeCompiler: true,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default']
      }),
    ],
  },

  devServer: {
    proxy: 'https://www.xiaoxiongmeishu.com'
  }
}