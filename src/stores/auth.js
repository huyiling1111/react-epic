import {observable,action} from "mobx";
import {Auth} from "../model"
import UserStore from './user';
class AuthStore{
    @observable isLogin =false;  //状态
    @observable isLoading =false;
    @observable values={
        username:'',
        password:''
    }

    @action setIsLogin(isLogin) {
        this.isLogin = isLogin;
    }
    @action setUsername(username) {
        this.values.username = username;
    }

    @action setPassword(password) {
        this.values.password = password;
    }
    @action login() {
        return new Promise((resolve, reject) => {
            Auth.login(this.values.username, this.values.password)
                .then(user => {
                    UserStore.pullUser();
                    console.log()
                    resolve(user);
                }).catch(err => {
                UserStore.resetUser();
                reject(err);
            })
        });
    }

    @action register() {
        return new Promise((resolve,reject)=>{
        Auth.register(this.values.username, this.values.password)
            .then(user => {
                UserStore.pullUser();
                console.log(UserStore.currentUser,'111')
               resolve(user)
            }).catch(err => {
            UserStore.resetUser();
           reject(err)
        })
        })
    }

    @action logout() {
        UserStore.resetUser();
        Auth.logout();
    }
}


export  default  new AuthStore();