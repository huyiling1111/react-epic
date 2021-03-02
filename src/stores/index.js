import React, { createContext, useContext } from 'react';
import { AuthStore } from './auth';

const context = createContext({
    AuthStore: new AuthStore()
});
// 创建上下文

export const useStores = () => useContext(context);
// 使用上下文 传递值的