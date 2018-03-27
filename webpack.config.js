
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin('css/[name]-one.css')
const extractSASS = new ExtractTextPlugin('css/[name]-two.css')


module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/js/app.js'),
    jquery: ['jquery']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name]-[hash].js'
  },
  devServer: {
    // hot: true, 不要设置hot热更新属性，设定后反而会失效
    port: 3000,
    inline: true
  },
  module: {
    rules: [{
      test: /\.css$/, // 匹配所有css文件
      use: extractCSS.extract([
        // { loader: 'style-loader' },
        { loader: 'css-loader', options: { importLoader: 1 } }, // importLoaders解决由于css-loader处理文件导入的方式导致postcss-loader不能正常使用的问题
        { loader: 'postcss-loader' }, // 指定postcss加载器

        { loader: 'postcss-loader' } // 指定postcss加载器
      ]),
      exclude: /node_modules/ // 排除对指定文件夹下所有资源的匹配
    }, {
      test: /\.scss$/,
      use: extractSASS.extract([
        // { loader: 'style-loader' },
        { loader: 'css-loader', options: { importLoaders: 1 } },
        { loader: 'postcss-loader' },
        { loader: 'sass-loader' }
      ])
    }, {
      test: /\.js$/,
      use: [{ loader: 'babel-loader' }],
      exclude: /node_modules/,
      include: /src/
    }, {
      test: /\.(png|jpg|gif|svg)$/i,
      exclude: /node_modules/,
      use: [{
        loader: 'url-loader',
        options: {
          // name: '[hash].[ext]',
          limit: 10460,
          outputPath: 'image/', // 定义图片输出存放的文件夹位置
          useRelativePath: true // 设置路径为相对路径
        }
      }, {
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: { // 设置对jpg格式的图片压缩的程度设置
            progressive: true,
            quality: 65
          },
          gifsicle: {
            progressive: true,
            quality: 65
          }
        }
      }]
    }, {
      test: /\.(htm|html)$/i,
      use: [{ loader: 'html-withimg-loader' }]
    }, {
      test: require.resolve('jquery'),
      use: [{
        loader: 'expose-loader',
        options: 'jQuery'
      }, {
        loader: 'expose-loader',
        options: '$'
      }]
    }]
  },
  plugins: [
    // 启用js压缩
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false
      }
    }),
    new webpack.ProvidePlugin(
      { $: 'jquery', jQuery: 'jquery' }
    ),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'jquery'
      // minChunks: 2
      // chunks: ['main', 'main1']
    }),
    new HtmlWebpackPlugin({
      template: 'html-withimg-loader!' + path.resolve(__dirname, './src/index.html'), // 定义插件读取的模板文件是根目录下的index.html
      filename: 'index.html' // 命名输出的HTML文件
    }),
    new CleanWebpackPlugin(
      ['dist'], // 匹配要删除的文件，这里则指定每次对dist文件夹进行清理
      {
        root: __dirname, // 指定插件根目录位置
        verbose: true, // 开启在控制台输出信息
        dry: false // 启用删除文件
      }
    ),
    extractCSS,
    extractSASS
  ]
}