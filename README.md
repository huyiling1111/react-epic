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

## 开发
开发流程大致分为：
1. 页面功能分析
2. 页面基础布局
3. 接入后台
4. 页面功能实现
5. 测试功能
6. 优化代码及设计
7. 发布产品上线

### 1. 页面功能分析
此图床项目的功能核心在上传图片，再反馈给用户线上地址预览。对于上传图片不能无限制的上传，所以需要有用户对应，以此来限制用户的上传量。或者单个文件的大小等。对于图床项目的拓展，可以提供一个修改图片尺寸的功能。大致就是这些。简单总结就是：用户登录、注册、注销，上传图片，文件限制，转换在线图片，修改图片尺寸大小。

### 2. 页面基础布局
本项目功能比较简单，页面可以设计可以偏向简约。我采用 antd UI 组件库来实现自己的 UI。一是因为方便，二是这个 UI 框架目前也比较流行。页面主体的布局比较简单，这里不再赘述。说几点细节。  
首先登录、注册我使用的方案是组件容纳内容，而不是增加新页面来实现。我使用了 antd 的 Drawer抽屉 组件，能达到点击登录注册按钮从预期的方向弹出登录注册表单。  
实现这个功能，碰到了这个项目的第一个状态，就是控制登录注册的开关（Toggle）。这个开关是需要在最少1个页面，3个组件中访问并使用的（可能是父子组件关系，也可能是兄弟组件）。由于之后的登录状态也需要全局数据，所以直接对整个App组件进行上下文管理，这样数据就能在子孙组件之间共享。  
全局数据管理的大致思路是：
1. 将所有相关数据模块化的存放在 store的index 中。
2. 将所有对数据的操作和观察封装在 各个store的action 和observable中
3. 创建对数据的读写 API 。（由于模块化编程，所以我们需要将所有数据在一个地方整合好后再统一传递）: 
举个例子
    ```jsx
   import { useStores } from '../stores';
const Component = observer(() => {
const { ImageStore, UserStore } = useStores();


ImageStore.setFile(file) 修改数据
ImageStore.serverFile.attributes.url.attributes.url 读数据

})
    ```


本项目需要登录注册两个按钮来分别控制两个组件，所以需要两个开关的变量来实现。操作也是两个，分别控制相应的变量，再在某个地方进行整合。  
要知道 React 并非是响应式的。这个 UI 的是因为 useReducer 帮我们渲染了。因为每一次操作都是产生一个新的状态，而非之前的那个状态。切记这一点，这个思维方式与之前学习的 Vue有些出入。Vue 的响应式是根据一个数据是否被改变了而更新UI，而 React 则是产生新的数据，不会修改之前的数据。
**懒加载**功能应该是网页必须的优化之一。在构建应用时我们需要关注代码包中所包含的代码，以避免因体积过大而导致加载时间过长。打包工具（如Webpack）就能提供代码分割，代码分割了就能实现动态按需加载。在初始加载的时候减少所需加载的代码量，能够显著地提高你的应用性能。  
React 中提供了一种方式，**React.lazy & Suspense** 技术，它目前还不支持服务端的渲染，服务端渲染推荐 Loadable Components 这个库。  
**React.lazy** 函数能让你像渲染常规组件一样处理动态引入（的组件）。使用方法如下：
```jsx
const OtherComponent = React.lazy(() => import('./OtherComponent'));
```
此代码会在页面首次渲染时自动导入相应的组件包。React.lazy 接收一个函数，这个函数需要动态调用import()，它必须返回一个 Promise，该 Promise 需要 resolve 一个 default export 的 React 组件。然后应在 **Suspense** 组件中渲染 lazy 组件，如此使得我们可以使用在等待加载 lazy 组件时做优雅降级（如 loading 指示器等）。
```jsx
import React, { Suspense } from 'react';
const OtherComponent = React.lazy(() => import('./OtherComponent'));
function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

### 3. 接入后台
leancloud 提供接口用于项目开发。可以完成登录、注册、发表商品等功能，是一个练手的好工具。本项目需要用到登录注册，然后保存图片，在线预览的功能。



#### 注册
模块化开发需要将服务器后台相关的、对所有相应的功能操作、以及真实存放用户信息三个单独分开开发。比如本项目中初始化 leancloud，以及使用 leancloud 暴露给我们的后端接口的代码在 **modules** 文件夹下，而对于注册登录等功能的操作在 **stores** 文件夹下。其中 stores 文件夹应该再细分每个单独的功能模块。这是我开发的目录结构。
1. 新建 'modules/index.js' 文件，写初始化代码，以及注册代码。注册代码使用参考[官方文档](https://leancloud.cn/docs/leanstorage-started-js.html#hash702893325) 比较重要的是要知道自己需要的是接受什么参数。这边的注册只需要用户名和密码即可。
2. 并且后端接口应该封装 Promise 以便使用这个接口的人捕获错误并做相应的操作。
    ```jsx
      register(username, password) {
        let user = new User()
        user.setUsername(username)
        user.setPassword(password)
        return new Promise((resolve, reject) => {
          user.signUp().then(
            loginedUser => resolve(loginedUser),
            error => reject(error)
          )
        })
     } 
    ```
3. 此时我们已经封装好了后台接口，所以可以开始管理我们的状态（注册、登录）。注册登录需要两个参数：用户名和密码。初始化一下两个参数，再提供方法来赋值这个参数。最后实现注册只需调用后台接口，再将此时的用户名密码传进去即可。注意：这里也应当返回一个 Promise，以便 UI 层能对错误进行相应的操作。

#### 登录





### `yarn install`
安装依赖

### `yarn start`
在开发模式下运行应用，打开 [http://localhost:3000](http://localhost:3000) 在浏览器中查看。

### `yarn build`
将要生产的应用构建到`build`文件夹中

