import { observable, action } from 'mobx';
import { Auth } from '../model';

class UserStore {
    @observable currentUser = null;

    @action pullUser() {
        this.currentUser = Auth.getCurrentUser()
    }

    @action resetUser() {
        this.currentUser = null;
    }
}


export default  new UserStore();