## 说明
webpack全家桶项目，基于`webpackSimple07`进一步拓展。

这个示例基本囊括webpack所有的功能。

* 增加了`imagemin-webpack-plugin`插件压缩图片
* 加入`postcss-loader`,`autoprefixer`插件自动补全css(各种前缀,如`-webkit,-ms`)
	* 另外关于雪碧图(现在已经不推荐使用，建议使用iconfont)
	* `autoprefixer`用法如下
* 规范了发布路径，尽量和开发路径结构一致
* 修复了`release`模式下  `html-webpack-plugin`和`html-loader`重复压缩的问题

```
//plugin中
new webpack.LoaderOptionsPlugin({
    options: {
        postcss: function() {
            return [autoprefixer];
        },
    }
})

//loaders中
loader: ExtractTextPlugin.extract({
    fallback: "style-loader",
    // 压缩css
    use: [config.isRelease ? "css-loader?minimize": "css-loader", "postcss-loader"]
})
```	
	
* 开启了`source-map`方便进行调试，默认这个配置支持线上模式，会生成一个map文件
	* uglify压缩时默认会去掉source-map，需要配置`sourceMap:true`
	* 另外config里的output可以配置`sourceMapFilename: 'maps/[file].map'`，将map文件放入maps文件夹中
	* 注意，请使用[file]而不是[name]，否则由于js和css的name相同，会被覆盖
* 加入`assets-webpack-plugin`插件将文件映射成json(方便其它地方使用)
	* 默认的json文件是会将output里的entry一一对应下来
	* 这个的作用主要是用来动态生成html的，本项目中并没有应用(本项目是用的html生成插件，内部自动替换了)
	* 如果要使用assets的json，一般再配合一个`fs插件`，比如

```
var fs =require('fs')
var path = require('path')
var fileContent = fs.readFileSync(path.join(__dirname,'assets/assets-map.json'))
var assetsJson = JSON.parse(fileContent);
function getStatic(resourcePath){
	var lastIndex = resourcePath.lastIndexOf('.')
	var name = resourcePath.substr(0,lastIndex),
		suffix = resourcePath.substr(lastIndex+1);
	if(name in assetsJson){
		return assetsJson[name][suffix]
	}else{
		return resourcePath;
	}
}
```

* 一般情况下以上代码配合html模板，即可生成插入对应js或者css的html，但是本项目中html是基于`HtmlWebpackPlugin`的，所有操作都在入口js中，文件自动插入，因此并没有使用这种更复杂的方法
	
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

```
//只需在config里声明sourcemap即可开启，无法引用额外包
devtool: 'eval-source-map',
```

以下是几种`devtool`的设置:(官网地址:[https://webpack.github.io/docs/configuration.html#devtool](https://webpack.github.io/docs/configuration.html#devtool))

```
eval： 生成代码 每个模块都被eval执行，并且存在@sourceURL

cheap-eval-source-map： 转换代码（行内） 每个模块被eval执行，并且sourcemap作为eval的一个dataurl

cheap-module-eval-source-map： 原始代码（只有行内） 同样道理，但是更高的质量和更低的性能

eval-source-map：(支持线上) 原始代码 同样道理，但是最高的质量和最低的性能

cheap-source-map： 转换代码（行内） 生成的sourcemap没有列映射，从loaders生成的sourcemap没有被使用

cheap-module-source-map：(支持线上) 原始代码（只有行内） 与上面一样除了每行特点的从loader中进行映射

source-map：(支持线上) 原始代码 最好的sourcemap质量有完整的结果，但是会很慢
```
