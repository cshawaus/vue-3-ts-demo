const path = require('path')

const { DefinePlugin } = require('webpack')

const { VueLoaderPlugin }  = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TsconfigPathsPlugin  = require('tsconfig-paths-webpack-plugin')

module.exports = (env) => ({
  context : path.resolve(process.cwd(), 'src'),
  devtool : env.production === true ? 'source-map' : 'eval-cheap-source-map',
  mode    : env.production === true ? 'production' : 'development',
  
  entry: {
    'main': './main.ts',
  },

  output: {
    path       : path.resolve(process.cwd(), 'dist'),
    publicPath : '/dist/',
  },

  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    
    alias: {
      'vue': '@vue/runtime-dom',
    },

    plugins: [
      new TsconfigPathsPlugin(),
    ],
  },

  module: {
    rules: [
      {
        test : /\.ts$/,
        
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',

            options: {
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
      {
        test : /\.vue$/,
        use  : 'vue-loader',
      },
      {
        test: /\.png$/,

        use: {
          loader: 'url-loader',

          options: {
            limit : 8192,
          },
        },
      },
      {
        test: /\.css$/,

        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            
            options: {
              hmr : env.production === false,
            },
          },
          'css-loader',
        ],
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),

    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),

    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env.production === true ? 'production' : 'development'),
      },

      __VUE_OPTIONS_API__   : JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__ : JSON.stringify(env.production === false),
    }),
  ],

  devServer: {
    contentBase : path.resolve(process.cwd()),
    hot         : true,
    inline      : true,
    overlay     : true,
    stats       : 'minimal',
  },
})