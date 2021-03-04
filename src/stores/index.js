import { createContext, useContext } from 'react';
import  AuthStore  from './auth';
import  UserStore  from './user';
import ImageStore from './image';


const context = createContext({
    AuthStore,
    UserStore,
    ImageStore
});
// 创建上下文

export const useStores = () => useContext(context);
// 使用上下文 传递值的

// 后代组件和后代组件之间没法直接传值, 就需要通过一层一层的祖辈组件去中转消息，才有了context