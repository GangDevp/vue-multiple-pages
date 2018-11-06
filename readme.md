## 多页面SPA

  基于Vue-router和Vuex实现多页面SPA，多个SPA app之间可以共享路由、store，不同SPA之间跳转时页面不刷新，以提高用户体验。

### 项目结构

<code>
  <pre>
  ---app-index 项目中的app index
  ---app-video 项目中的app video
  ---routes 项目中的路由入口
  ---stores 项目中的store入口
  ---utils 项目中的工具函数
  </pre>
</code>

  ### 运行项目

  `npm run dev`

  tips: 运行项目前先在IndexedDB中存储项目所需的数据