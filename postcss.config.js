module.exports = ({ options }) => ({
  plugins: {
    'postcss-import': {},
    
    cssnano: options.production === true ? {} : false,
  },
})
