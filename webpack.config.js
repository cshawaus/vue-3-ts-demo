const path = require('path')

const { DefinePlugin } = require('webpack')

const { VueLoaderPlugin }  = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const envDefaults = {
  prod: false,
}

module.exports = (env = envDefaults) => ({
  mode    : env.prod === true ? 'production' : 'development',
  devtool : env.prod === true ? 'source-map' : 'cheap-module-eval-source-map',
  entry   : path.resolve(__dirname, './src/main.ts'),

  output: {
    path       : path.resolve(__dirname, './dist'),
    publicPath : '/dist/',
  },

  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    
    alias: {
      'vue': '@vue/runtime-dom',
    },
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
              hmr : env.prod === false,
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
        NODE_ENV: JSON.stringify(env.prod === true ? 'production' : 'development'),
      },

      __VUE_OPTIONS_API__   : JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__ : JSON.stringify(env.prod !== false),
    }),
  ],

  devServer: {
    contentBase : __dirname,
    hot         : true,
    inline      : true,
    overlay     : true,
    stats       : 'minimal',
  },
})
