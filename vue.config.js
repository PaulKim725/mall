module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // 内部已经默认配置了@别名
        // '@': 'src'
        'api': '@/api',
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'views': '@/views',
      }
    }
  }
}