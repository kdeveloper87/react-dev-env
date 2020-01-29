const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  name: 'react-setting',
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  entry: {
    app: ['./src/index'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: ['>1% in KR', 'last 2 chrome versions'],
                },
                debug: false,
              },
            ],
            '@babel/preset-react',
          ],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            'react-hot-loader/babel',
          ],
        },
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: true }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
  ],

  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].[hash].js',
    // publicPath: 'dist/',
  },
};

module.exports = (env, { mode }) => {
  if (mode === 'production') {
    config.plugins = [...config.plugins, new CleanWebpackPlugin()];
  }

  return config;
};
