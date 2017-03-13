## 说明
这个新手示例中，基于`webpackSimple05`进一步拓展。

* 增加了项目目录结构说明md文件
* 增加了static文件夹作为静态资源，并且通过`CopyWebpackPlugin`插件复制静态资源
* 增加release版本和dev版本的开关切换,release版本会压缩，并对所有资源进行md5签名
* 增加`chunkHash`的使用，release版本下会对js,css以及img使用hash，主要用来解决缓存
* 增加别名`alias`的使用，`require(别名)`方式可以减少维护成本
* css的hash签名改用`contenthash`
	* 因为新版的webpack中，默认修改css是不会改变相应js的`chunkHash`的
	* 所以必须使用`ExtractTextPlugin`插件提供的`contenthash`签名
* 需要注意，本项目中，公告文件被拆分为了`vendor`和`vendor.bundle`
	* 其中，`vendor`只有当公用文件变动时，hash才会变
	* `vendor.bundle`则是只要有js文件变动，则会变动

## 使用步骤

* 将`common.config.js`中的`publicPath`改成自己对应的路径(也可以使用默认设置，但确保8080端口不被占用)
* `npm install`安装所有依赖包
* `npm run build`可以构建出部署包
* `npm run serve`会开启服务器(端口`8080`)，并且自动监听页面变化更新服务器端页面

默认在`http://localhost:8080/webpack-dev-server/dist/pages`可以看到效果，然后更改src下的源码即可看到实时更新。


## 全部功能清单:

* 有发布模式和开发模式，发布模式会进行一些资源压缩等操作
* 增加别名使用`alias`
* 增加静态资源的复制`CopyWebpackPlugin`
* 解决了css中的路径引用问题(如css中引用图片，字体)-通过publicPath解决
* 解决了HtmlWebpackPlugin中的html img引入问题(通过html-loader)
* 解决了hash的生成，通过`chunkhash`和`contenthash`以及`hash`不同场景下的使用
* 解决了css打包合并问题(通过ExtractTextPlugin)
* 解决了公告资源抽取问题(通过CommonsChunkPlugin)
* 解决了min.css反复压缩出错问题(通过正则表达式判断)
* 解决了webpack-dev-server自动监听源码更改并刷新问题，支持iframe模式和inline+hot模式
