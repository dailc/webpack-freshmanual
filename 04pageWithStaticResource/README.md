## 说明
这个新手示例中，基于`webpackSimple03`进一步拓展。

* 开始安装实际项目划分目录(划分目录后能暴露出一些实际中的路径问题)
* html文件内部引入了img，css内部也有引入img和font
* 通过正则过滤，解决了`.min.css`反复压缩会报错问题
* 增加了`html-loader`，可以对html内部的img资源进行替换
* 加入了`publicPath`这个概念，主要用来解决资源替换后的路径引用问题
	* 正常如果没有加入publicPath，替换img和font等资源时，路径会出现问题
	* 因此加入这个变量， 采用绝对路径
* 加入了`webpack-dev-server`的配置
	* 注意，由于publicPath与serve默认的不一样了，所以需要手动配置了
	* 默认配置成iframe的刷新模式


## 使用步骤

* 将`common.config.js`中的`publicPath`改成自己对应的路径(也可以使用默认设置，但确保8080端口不被占用)
* `npm install`安装所有依赖包
* `npm run build`可以构建出部署包
* `npm run serve`会开启服务器(端口`8080`)，并且自动监听页面变化更新服务器端页面

默认在`http://localhost:8080/webpack-dev-server/dist/pages`可以看到效果，然后更改src下的源码即可看到实时更新。
