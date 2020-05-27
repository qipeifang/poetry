# 古诗词前端
- npm install antd --save
- npm i react-router-dom
- npm i less less-loader --save
- npm i react-particles-js
- npm install react-loadable

 (4.25)
- npm i axios 接口请求
(4.29)
- npm i redux
- npm i --save react-redux
- npm i immutable

# pages
  admin中的页面与用户相关, web是网页
  - admin/login 登录页面
  - web/layout 主页面
  - web/list   主页面中的展示列表组件

代码层次：
App.js 路由配置
/src/pages/admin 登录组件  和  管理员的管理组件
/src/pages/web/header    头部组件
              /ancient   和 author 、 poetry 、 rhesis  导航栏对应组件
              /component 可复用的列表组件和放标签的组件
              /manage    用户管理自己的信息的组件