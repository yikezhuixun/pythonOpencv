let logList = [];
let logElement = null;
const sLog = {
    enable: false,
    max: 10,
    log(msg, color = "#999999") {
        if (!this.enable) return;
        logList.push([msg, color]);
        logList = logList.slice(-this.max);
        if (!logElement) {
            logElement = document.createElement("div");
            logElement.id = "debuginfo";
            logElement.setAttribute("style", "font-size:24px;position: fixed;top:10px;left:10px;background:rgba(0,0,0,0.4);padding:10px;");
        }
        if (document.body && !document.getElementById("debuginfo")) {
            document.body.appendChild(logElement);
        }
        if (logElement) {
            logElement.innerHTML = "";
            for (let info of logList) {
                logElement.innerHTML += `<span style="color:${info[1]}"> ${info[0]}</span><br>`
            }
        }

    },
    d(msg) {
        this.log(msg, "#06B8E8")
    },
    i(msg) {
        this.log(msg, "#eeeeee");
    },
    e(msg) {
        this.log(msg, "#ff0000");
    },
    w(msg) {
        this.log(msg, "#ff9900");
    },
    v(msg) {
        this.log(msg, "#999999");
    }
}
module.exports = sLog;