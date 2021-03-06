module.exports = {

  // productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        '>assets': '@/assets',
        '>common': '@/common',
        '>components': '@/components',
        '>network': '@/network',
        '>views': '@/views',
      }
    },
    optimization: {
      minimize: false,
    }

  }
}

