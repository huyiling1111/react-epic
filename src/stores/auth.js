import {observable,action} from "mobx";
import {Auth} from "../model"
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
        Auth.login(this.values.username, this.values.password)
            .then(user => {
                console.log(user)
            }).catch(err => {
            console.log(err)
        })

    }

    @action register() {
        return new Promise((resolve,reject)=>{
        Auth.register(this.values.username, this.values.password)
            .then(user => {
               resolve(user)
            }).catch(err => {
           reject(err)
        })
        })
    }

    @action logout() {
        console.log('已注销');
    }
}


export { AuthStore } ;