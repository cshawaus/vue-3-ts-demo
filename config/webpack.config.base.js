const path = require('path')

const { DefinePlugin } = require('webpack')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TsconfigPathsPlugin  = require('tsconfig-paths-webpack-plugin')
const { VueLoaderPlugin }  = require('vue-loader')

const IS_DEV_SERVER = !!process.env.WEBPACK_DEV_SERVER

module.exports = (env) => {
  const IS_DEV_MDOE   = env.development === true || IS_DEV_SERVER
  const IS_PROD_MDOE  = env.production === true

  return {
    context : path.resolve(process.cwd(), 'src'),
    devtool : IS_PROD_MDOE ? false : 'eval-cheap-source-map',
    mode    : IS_PROD_MDOE ? 'production' : 'development',
    
    entry: {
      'main': ['./main.css', './main.ts'],
    },

    output: {
      path       : path.resolve(process.cwd(), 'dist'),
      publicPath : IS_DEV_SERVER ? '/' : './',
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
                // esModule  : true,
                hmr       : IS_DEV_MDOE,
                reloadAll : true,
              },
            },
            {
              loader: 'css-loader',
              
              options: {
                // esModule      : true,
                importLoaders : 2,
              },
            },
            {
              loader: 'postcss-loader',
          
              options: {
                ident     : 'postcss',
                sourceMap : IS_DEV_MDOE,

                config: {
                  path: process.cwd(),

                  ctx: {
                    production: IS_PROD_MDOE,
                  },
                },
              },
            },
          ],
        },
      ],
    },

    plugins: [
      new CleanWebpackPlugin(),

      new HtmlWebpackPlugin({
        inject   : 'body',
        template : 'index.html',
        title    : 'Vue 3 Playground',
      }),

      new MiniCssExtractPlugin({
        filename: IS_PROD_MDOE ? '[name].[hash].css' : '[name].css',
      }),

      new VueLoaderPlugin(),

      new DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(IS_PROD_MDOE ? 'production' : 'development'),
        },

        __VUE_OPTIONS_API__   : JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__ : JSON.stringify(env.production === false),
      }),
    ],

    devServer: {
      contentBase : path.resolve(__dirname, 'dist'),
      hot         : true,
    },
  }
}