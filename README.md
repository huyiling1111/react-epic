## 介绍
ipic 项目是一个图床项目。它主要支持将本地图片上传到云端，供在线预览，修改尺寸，查看历史记录并附链接。

## 技术栈
- React
- React-Router
- Mobx
- SCSS

## 开发文档

### 页面路由
长话短说（四个关键词）：
1. Router 标签包裹一切。 （最外层包裹)
2. Switch 最终得到的是一个路由结果。（用于显示切换路由后的页面，Switch 标签内有 Route 供给结果。）
3. Route 做匹配路由用，匹配到的结果给 Switch。
4. Link（/NavLink） 用作路由跳转，相当于链接。

### 路由
官方给 React-Router 的主要成分：
- 路由器(routers)： `<BrowserRouter>, <HashRouter>`
- 路线匹配者(route matchers): `<Route>, <Switch>`
- 导航,也叫路线更改者(navigation): `<Link>, <NavLink>, <Redirect>`

#### 两种路由模式
BrowserRouter、HashRouter是 React-Router 中的两种模式。
**BrowserRouter** 需要服务器支持，是比较友好美观的方式。此方法适用于**create-react-app**的开发环境中。因为有个本地服务器，可配置。

而 **HashRouter** 是将当前位置存储在URL的哈希部分中。因为哈希永远不会发送到服务器，这就不需要服务器的配置。我发布到 github-pages 上时会将路由模式切换到 BrowserRouter

官方文档中还介绍了一种**memory history**内存历史记录实现，可用于测试和非DOM环境（例如React Native）。

本项目将 App 组件在 index.js 文件中使用 Router 包裹。然后在 App 组件中写路由匹配与导航切换。按钮的跳转页面功能使用 react-router-dom 包中的 useHistory Hooks 来实现。
useHistory挂钩使您可以访问可用于导航的历史记录实例。

- exact 表示首页
- 导航是 to 表示跳转的路由
- 路由匹配是用 path + component 属性
```jsx
// index.js
import {HashRouter} from 'react-router-dom'
ReactDOM.render(
  <HashRouter>
      <App/>
  </HashRouter>,
  document.getElementById('root')
)

// App.js
import {Switch, Route} from 'react-router-dom'
const App = () => {
  return (
    <div className="App">
        <nav>
          <NavLink to='/' exact activeClassName="active">首页</NavLink>
          <NavLink to='/history'>上传历史</NavLink>
          <NavLink to='/about'>关于我</NavLink>
        </nav>
      <Switch>
        <Route path='/' component={Home} exact/>
        <Route path='/history' component={History}/>
        <Route path='/about' component={About}/>
      </Switch>
    </div>
  ) 
}
```

### 全局状态管理
在一个项目中难免会遇到多个组件访问一个数据的情况，像这种共享数据以及通信，须有有一个统一的机制进行管理。这样才有益于维护与编程。全局状态管理就充当了对统一状态的增、删、改、查。  
在 React 项目中全局状态管理的方式有很多，比如 Redux、 Mobx、以及 React Hooks API 中的 useReducer（需搭配 createContext 上下文）。  
在本项目中我将使用 Mobx和useContext结合来实现全局状态管理。
