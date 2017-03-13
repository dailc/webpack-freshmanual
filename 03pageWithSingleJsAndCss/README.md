## 说明
这个新手示例中，基于`webpackSimple02`进一步拓展。

* 示例页面变为了两个`index.html`和`index2.html`
* 抽取了一个`common.config`，用来进行一些配置
* `htmlPagePluginConfig`中配置了html的路径与所需引入的脚本
* 会自动读取src下的所有js文件进行编译
* 增加了js文件直接互相调用的示例

最终打包出来的页面是: 每一个Html中只会引入一个对应的JS和一个CSS(css是在js内部引入的)

## 使用步骤

* `npm install`安装所有依赖包
* `npm run build`可以构建出部署包
* `npm run serve`会开启服务器(端口`8082`)，并且自动监听页面变化更新服务器端页面