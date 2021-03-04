import AV, { User } from 'leancloud-storage';

AV.init({
    appId: "E1XSPYpkT8lhggteKbJw5Edk-gzGzoHsz",
    appKey: "caRSIXUMjnXJ0KWUpowpJfNy",
    serverURL: "https://e1xspypk.lc-cn-n1-shared.com"
});
// 调用后端接口
const Auth = {
    register(username, password) {
        let user = new User();
        user.setUsername(username);
        user.setPassword(password);
        return new Promise((resolve, reject) => {
            user.signUp().then(loginedUser => resolve(loginedUser), error => reject(error))
        });
    },

    login(username, password) {
        console.log('------')
        console.log(username, password)
        return new Promise((resolve, reject) => {
            User.logIn(username, password).then(loginedUser => resolve(loginedUser), error => reject(error));
        });
    },
//promise 就是解决回调函数获取结果 返回的resolve(参数)，这里的参数必须要有值
    logout() {
        User.logOut();
    },

    getCurrentUser() {
        return User.current();
    }

}
const Uploader = {
    add(file, filename) {
        const item = new AV.Object('Image');
        const avFile = new AV.File(filename, file);
        item.set('filename', filename);
        item.set('owner', AV.User.current());
        item.set('url', avFile);
        return new Promise((resolve, reject) => {
            item.save().then(serverFile => resolve(serverFile), error => reject(error));
        });
    }
}
console.log('当前用户',Auth.getCurrentUser())

export {
    Auth,Uploader
};

