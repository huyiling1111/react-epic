import {observable,action} from "mobx";
import { Uploader } from '../model';

class ImageStore {
    @observable filename = "";
    @observable file = null;
    @observable isUpoading = false;
    @observable serverFile = null;

    @action setFilename(newFilename) {
        this.filename = newFilename;
    }

    @action setFile(newFile) {
        this.file = newFile;
    }

    @action upload() {
        this.isUpoading = true;
        return new Promise((resolve, reject) => {
            Uploader.add(this.file, this.filename)
                .then(serverFile => {
                    this.serverFile = serverFile;
                    resolve(serverFile);
                }).catch(err => {
                console.error('上传失败');
                reject(err);
            }).finally(() => {
                this.isUpoading = false;
            });
        })

    }

}
export default new ImageStore();