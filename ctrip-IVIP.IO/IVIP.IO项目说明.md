## 这里是用于携程前端培训营大作业的代码存储库

我们选择的大作业题目是：**【题⽬4】企业内购的⼀套购物站点**。我们参考了携程网酒店下单的具体流程和常见的后台管理系统的功能，搭建出了一个前后端分离的**内部酒店预订管理平台**.

项目目录

- ctrip-IVIP.IO

  - ctrip-IVIP.IO-express 使用Express和Mongodb搭建的后台服务
    - model 数据库集合
    - mongoddata/hotels 数据库备份
    - node_modules 项目依赖
    - public/stylesheets 静态资源
    - routes 路由接口
    - 其他配置文件
  - ctrip-IVIP.IO-nextjs 使用Nextjs搭建的前端服务
    - .next
    - public 部分静态资源
    - src
      - api	定义了部分api请求（后面api全部使用utils/request.ts封装的fetch请求函数实现）
      - compoents 组件（纯函数组件+hooks）
      - pages 页面（登录、注册、酒店列表、酒店详情、下单页、支付页、订单详情、订单管理、用户管理）
      - type  类型声明文件
      - utils 自定义hooks和工具函数
    - 其他配置文件

  ​	

## 启动我们的项目

### 前端启动：

```
npm -i 
npm run dev 
```

默认本地前端服务在 [http://localhost:3001](http://localhost:3000/) 启动，可以通过package.json文件，修改"dev": "next dev -p 3001"来切换端口号

为了和本地的后端服务进行交互，我们对发送的fetch请求进行了重定向，可以通过修改next.config.js下面的destination进行修改：

```typescript
// 启动mock服务，执行这个代码
//destination: `http://127.0.0.1:4523/m1/2574886-0-default/api/:path*`,
// 连接本地的nodejs服务，执行这个代码
destination: `http://localhost:3000/api/:path*`,
```



### 后端启动

在本地使用 localhost:<port> 启动mongod服务。打开命令提示符窗口，进入MongoDB安装目录的bin目录输入命令来拉取数据到mongodb数据库中：

```
>mongorestore -h <hostname><:port> -d dbname <path>
```

-host <:port>, -h <:port>：

MongoDB所在服务器地址，默认为： localhost:27017

--db , -d ：

需要恢复的数据库实例，例如：hotels，拉取酒店信息数据至mongoDB中

<path>:

mongorestore 最后的一个参数，设置备份数据所在位置，例如：c:\data\mongoddata\hotels

数据库的连接：更改model\index.js 中mongoose的数据库链接，连接到刚刚拉取的hotels数据库。

随后可以启动后端服务器了！(默认在 http://localhost:3001 端口启动)

```
npm i
npm run dev
```





