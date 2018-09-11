(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], function (exports) {
            factory((root.animateJs = exports));
        });
    } else if (typeof exports === 'object') {
        factory(exports);
    } else {
        factory((root.animateJs = {}));
    }
}(this, function (exports) {

    (function () {
        var lastTime = 0;
        var vendors = ['webkit', 'moz'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame =
                window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function (callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function () {
                        callback(currTime + timeToCall);
                    },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
    }());
    /**
     * 
     * @param {HTMLElement} source 执行动画的元素
     * @param {HTMLElement} target 目标元素
     * @param {Array} styleNames 跟着目标的样式
     * @param {Float} speedFactor 速度因子，使动画具有缓冲效果，而不是匀速不变（speedFactor为1）
     * @param {Function} done 动画结束回调
     */
    exports.animateTo = function (source, target, styleNames, speedFactor = 1, done = null) {
        cancelAnimationFrame(source.timer);
        var rects = ["x", "y", "top", "left", "right", "bottom"];

        function getStyle(obj, prop) {
            if (rects.indexOf(prop) > -1)
                return obj.getBoundingClientRect()[prop];
            else
                return document.defaultView.getComputedStyle(obj, null)[prop];
        }

        function loop() {
            var flag = true;
            for (var i in styleNames) {
                var prop = styleNames[i];
                var cur = 0;
                var tar = 0;
                if (prop == "opacity") {
                    cur = Math.round(parseFloat(getStyle(source, prop)) * 100);
                    tar = Math.round(parseFloat(getStyle(target, prop)) * 100);
                } else {
                    cur = parseInt(getStyle(source, prop));
                    tar = parseInt(getStyle(target, prop));
                }

                var speed = (tar - cur) * speedFactor;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

                if (cur != tar)
                    flag = false;
                if (prop == "opacity") {
                    source.style.opacity = (cur + speed) / 100;
                } else {
                    source.style[prop] = cur + speed + "px";
                }
            }
            if (flag) {
                cancelAnimationFrame(source.timer);
                if (done)
                    done();
            } else
                source.timer = window.requestAnimationFrame(loop);
        }
        source.timer = window.requestAnimationFrame(loop);
    }

    /**
     * 
     * @param {HTMLElement} obj 执行动画的元素
     * @param {Object} css 要改变的属性和值
     * @param {Float} speedFactor 速度因子，使动画具有缓冲效果，而不是匀速不变（speedFactor为1）
     * @param {Function} done 动画结束回调
     * @param {Function} update 执行中
     */
    exports.animate = function (obj, css, speedFactor, update,done) {
        cancelAnimationFrame(obj.timer);
        var rects = ["x", "y", "top", "left", "right", "bottom"];

        function getStyle(obj, prop) {
            if (rects.indexOf(prop) > -1)
                return obj.getBoundingClientRect()[prop];
            else
                return document.defaultView.getComputedStyle(obj, null)[prop];
        }

        function loop() {
            var flag = true;
            for (var prop in css) {
                var cur = 0;
                if (prop == "opacity") {
                    cur = Math.round(parseFloat(getStyle(obj, prop)) * 100);
                } else {
                    css[prop] = parseInt(css[prop]);
                    var p = getStyle(obj, prop);
                    cur = parseInt(p);

                    // console.log("prop = " + prop + " p = " + p);
                }
                var speed = (css[prop] - cur) * speedFactor;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                // console.log("loop obj = " + obj.id + " prop = " + prop + " cur =" + cur + " speed = " + speed + " css[prop] = " + css[prop]);
                if (prop == "opacity") {

                    if (cur != Math.round(parseFloat(css[prop]) * 100))
                        flag = false;

                } else {
                    if (cur != css[prop])
                        flag = false;
                }
                if (prop == "opacity") {
                    obj.style.opacity = (cur + speed) / 100;
                } else {
                    obj.style[prop] = cur + speed + "px";
                }
            }
            if (flag) {
                cancelAnimationFrame(obj.timer);
                if (typeof done == "function")
                    done();
            } else {
                if (typeof update == "function")
                    update();
                obj.timer = window.requestAnimationFrame(loop);
            }
        }
        obj.timer = window.requestAnimationFrame(loop);
    }
    exports.stop = function (obj) {
        cancelAnimationFrame(obj.timer);
    }

}));