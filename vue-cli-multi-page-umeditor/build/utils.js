'use strict'
const path = require('path')
const config = require('../config')
const glob = require('glob');
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')

// var PAGE_PATH = path.resolve(__dirname, '../src/pages')

function resolvePages (dir) {
  return path.join(__dirname, '../src/pages', dir)
}

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
function getEntries (globPath,type) {

  var ishtml=type!==undefined?true:false;
  var entries = {}
  glob.sync(globPath).forEach(function (entry) {
    if(ishtml){
        var tmp = entry.split('/').splice(-3)
        var moduleName = tmp.splice(0,2).join("/");
        entries[moduleName] = entry
    }
    else{
        //js以模块文件作为输出,比如indx.js
        var basename = path.basename(entry, path.extname(entry));
        var tmp = entry.split('/').splice(-3);
        var pathname = tmp.splice(1, 1);
        entries[pathname] = entry;
    }
  });
  return entries;
}
//多入口配置
// 通过glob模块读取pages文件夹下的所有对应文件夹下的js后缀文件，如果该文件存在
// 那么就作为入口处理
exports.entries = function() {
    return getEntries(resolvePages('/*/*.js'))
}

//多页面输出配置
// 与上面的多页面入口配置相同，读取pages文件夹下的对应的html后缀文件，然后放入数组中
exports.htmlPlugin = function(exportsEntry,plugins) {

  console.log('exportsEntry ----------');
  console.log(exportsEntry);

    var pages = getEntries(resolvePages('/*/*.html'),1);
    let arr = []

    for(var pathname in pages){
        // pages.forEach((filePath) => {
        // let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        let conf = {
            filename: pathname + '.html', // html文件输出路径
            template: pages[pathname],
            chunksSortMode: 'dependency',
            // chunks: ['manifest', 'vendor',moduleName],
            // chunks = ['vendor', 'manifest', pathname],

        }
        if (process.env.NODE_ENV === 'production') {
            conf = merge(conf, {
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                }
              }
            )
        }
        pathname=pathname.split("/")[1];//去掉views
        // conf = merge(conf, {
        //    inject : 'body',
        //   chunks :['vendor', 'manifest', pathname],
        //   hash : true
        // })
        // if (pathname in module.exports.entry) {
        if (pathname in exportsEntry) {
          conf.inject = 'body';
          conf.chunks = ['vendor', 'manifest', pathname],
          conf.hash = true;
        }
        plugins.push(new HtmlWebpackPlugin(conf))
    }
}
