const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV;

var baseUrl = '';
module.exports = {
  publicPath: baseUrl,
  runtimeCompiler: true,
  configureWebpack: {
    externals: {
      
    },
    output:
      NODE_ENV !== 'development'
        ? {
          filename: 'js/[name].[hash:10].js',
          chunkFilename: 'js/[name].[chunkhash:10].js'
        }
        : {},
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery/dist/jquery.min',
        jQuery: 'jquery/dist/jquery.min',
        'window.jQuery': 'jquery/dist/jquery.min',
        requirejs: 'requirejs.min',
      }),
    ],
  },
  devServer: {
    proxy: 'https://www.xiaoxiongmeishu.com'
  }
}