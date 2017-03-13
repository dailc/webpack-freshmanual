## 说明
这个新手示例中，基于`webpackSimple06`进一步拓展。
基本囊括了webpack项目开发中用到的功能。

* 增加了一个`api-server`，来进行本地接口调用，默认监听`8888`端口
	* 默认的server基于`express`组件，已经进行了跨域请求配置

## 使用步骤

* 将`common.config.js`中的`publicPath`改成自己对应的路径(也可以使用默认设置，但确保8080端口不被占用)
* `npm install`安装所有依赖包
* `npm run build`可以构建出部署包
* `npm run serve`会开启服务器(端口`8080`)，并且自动监听页面变化更新服务器端页面

默认在`http://localhost:8080/webpack-dev-server/dist/pages`可以看到效果，然后更改src下的源码即可看到实时更新。

### 快捷启动
开发模式使用步骤:

* 双击`start.bat`开启`webpack-dev-server`开启服务并自动监听源码改动构建
* 双击`localserver`开启本地api服务

发布模式使用步骤:

* 进入`common.config.js`里面，将`isRelease`设为`true`，并修改`publicPath`为外网路径
* 双击`build.bat`构建发布目录


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
* 增加了一个`api-server`作为本地api服务器，进行测试接口调用