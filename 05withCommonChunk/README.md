## 说明
这个新手示例中，基于`webpackSimple04`进一步拓展。

* 增加了`UglifyJsPlugin`插件用来对js进行压缩
* 增加了`CommonsChunkPlugin`插件用来抽取公共资源文件
	* 单独使用了一种黑魔法，将`commonChunk`里的bundle文件抽取出来了，避免公用模块的hash计算出错(暂时没用到hash)
	* 需要注意的是，提取出来的common模块，需要手动在`HtmlWebpackPlugin`中配置引入相应的css
	* 相关配置文件都抽取到了`common.config.js`中
* 修改`htmlpage.config`里的页面name配置，解决开发路径与打包路径不一致问题
* 实际开发过程中，采用基于根目录的绝对路径来进行，解决路径不对问题

## 使用步骤

* 将`common.config.js`中的`publicPath`改成自己对应的路径(也可以使用默认设置，但确保8080端口不被占用)
* `npm install`安装所有依赖包
* `npm run build`可以构建出部署包
* `npm run serve`会开启服务器(端口`8080`)，并且自动监听页面变化更新服务器端页面

默认在`http://localhost:8080/webpack-dev-server/dist/pages`可以看到效果，然后更改src下的源码即可看到实时更新。
