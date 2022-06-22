const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
    configureWebpack: {
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
        devServer: {
            disableHostCheck: true //防止在开发环境中报类似https://blog.csdn.net/lifachang/article/details/103201799这种错误
        } 
    },
    productionSourceMap: false,
    outputDir: "wordrive"
}
