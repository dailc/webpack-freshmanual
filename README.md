## 说明
webpack入门系列示例，循序渐进的练习webpack功能时的系列demo，每一个demo都有自身的`READEME.MD`说明

demo项目结构及其说明:

```
├── 01helloWorld	# 入门hellworld，一个html,一个js，一个css，css默认嵌入在js中，html采用`HtmlWebpackPlugin`加载
├   
├── 02helloWorld2	# 基于第1个进行拓展，css使用`ExtractTextPlugin`单独打包成一个文件
├   
├── 03pageWithSingleJsAndCss	# 基于第2个进行拓展，示例页面由一个变为多个，并且抽取了通用配置文件`common.config`
├   
├── 04pageWithStaticResource	# 基于第3个进行拓展，增加了`html-loader`替换静态资源，解决了css重复压缩报错问题，使用`publicPath`，解决资源文件引用路径问题，增加了`webpack-dev-server`配置
├
├── 05withCommonChunk	# 基于第4个进行拓展，增加了`CommonsChunkPlugin`提取公告js和css，增加了`UglifyJsPlugin`,修改了一些配置，更好应用于项目
├
├── 06withHashStaticAndRelease	# 基于第5个进行拓展，增加了`CopyWebpackPlugin`复制静态资源，增加了`chunkhash`,`contenthash`等指纹签名功能，增加了`alias`别名设置，增加了release版本和dev版本的开关
├   
├── 07withLocalServer	# 基于第6个进行拓展，增加了一个`api-server`，来写本地测试接口(已经进行了跨域配置)
├   
└── 08withFamilyBucket	# 基于第7个进行拓展，webpack全家桶项目，增加了`source-map`，增加了`assets-webpack-plugin`(仅仅生成，但没有使用起来)
```