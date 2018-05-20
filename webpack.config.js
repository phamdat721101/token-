const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './app/javascripts/app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js'
  },
  plugins: [
    // Copy our app's index.html to the build folder.
	 new CopyWebpackPlugin([
      { from: './app/index.html', to: 'index.html' }
    ])
  ],
  module: {
    rules: [
      {
       test: /\.css$/,
       use: [ 'style-loader', 'css-loader' ]
      },
      {test:/\.scss$/,use:['style-loader', 'css-loader' ,'postcss-loader','sass-loader']},
      {
        test:/\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use:'url-loader?limit=10000'
      },
      {
        test:/\.(ttf|eot|svg)(\?[\s\5]+)?$/,
        use:'file-loader'
      }
    ],
    loaders: [
      { test: /\.json$/, use: 'json-loader' },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['env','react'],
          plugins: ['transform-runtime']
        }
      }
    ]
  }
}
