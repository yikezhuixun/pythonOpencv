export default {
    __data: null,
    get isReady() {
        return this.__data !== null;
    },
    load() {
        return new Promise((resolve, reject) => {
            var request = new XMLHttpRequest();
            request.open('GET', "data/config.json", true);
            request.onload = () => {
                this.__data = JSON.parse(request.responseText);
                resolve();
            };
            request.onerror = (e) => {

                console.log(" request.e =" + e);
                reject(e);
            }
            request.send();

        });
    },
    getData(type) {
        return new Promise((resolve, reject) => {
            if (this.isReady && Object.prototype.hasOwnProperty.call(this.__data, type)) {
                resolve(this.__data[type]);
            } else {
                this.load().then(() => {
                    if (this.isReady && Object.prototype.hasOwnProperty.call(this.__data, type)) {
                        resolve(this.__data[type]);
                    }
                }).catch((e) => {
                    reject(e);
                });
            }
        });
    },
    getApplist() {
        return this.getData("apps");
    },
    getSettings() {
        return this.getData("settings");
    },
    getSourceList(){
        return this.getData("source");
    },
    getConfig() {
        return this.getData("config");
    }
}