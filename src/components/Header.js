import React,{useState,useEffect} from 'react';
import LogoUrl from './logo.svg';
import { NavLink ,useHistory} from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'antd';
import { useStores} from '../stores';
import { observer } from 'mobx-react';

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 10px 100px;
  background-color: #02101f;
  color: #fff;
`;

const Logo = styled.img`
  height: 30px;
`;

const StyledLink = styled(NavLink)`
  color: #fff;
  margin-left: 30px;

  //&.active {
  //  border-bottom: 1px solid #fff;
  //}
`;

const Login = styled.div`
  margin-left: auto;
`;

const StyledButton = styled(Button)`
  margin-left: 10px;
`;


const Component=observer(()=> {
    const history = useHistory();
    const { UserStore, AuthStore } = useStores();



    useEffect(()=>{
        UserStore.pullUser();
    },[])

    const handleLogout=()=>{
        AuthStore.logout()
    }
    const handleRegister = () => {
        console.log('跳转到注册页面')
        history.push('/register');
    }
    const handleLogin = () => {
        console.log('跳转到登录页面')
        history.push('/login');
    };


    return (
    <Header>
      <Logo src={LogoUrl}/>
      <nav>
        <StyledLink to="/" activeClassName="active" exact>首页</StyledLink>
        <StyledLink to="/history" activeClassName="active">上传历史</StyledLink>
        <StyledLink to="/about" activeClassName="active">关于</StyledLink>
      </nav>
      <Login>
          {
              UserStore.currentUser ? <>
                  {UserStore.currentUser.attributes.username} <StyledButton type="primary" onClick={handleLogout} >注销</StyledButton>
              </> :<>
                  <StyledButton type="primary" onClick={handleLogin}>登录</StyledButton>
                  <StyledButton type="primary"  onClick={handleRegister}>注册</StyledButton>
              </>

          }
      </Login>

    </Header>
  );
})

export default Component;