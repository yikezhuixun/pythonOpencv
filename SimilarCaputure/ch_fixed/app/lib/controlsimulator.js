var isDragging = false,
    mouseoffsetX,
    mouseoffsetY,
    timer = 0,
    controller = null,
    showing = true,
    focusmove;
export default {


    show(fm = null) {
        focusmove = fm;
        controller = document.getElementById("controller_simulator");
        if (controller != null) {
            return controller;
        }
        controller = document.createElement("div");
        controller.id = "controller_simulator"
        controller.innerHTML = "";
        controller.setAttribute("style", "z-index:99999999;border:2px solid rgba(0,0,0,0.7);color:#ffffff; border-radius: 150px; background: rgba(0, 0, 0, 0.5); width: 300px;height: 300px;position:absolute;right: 50px;bottom: 50px;");
        var group = null;
        for (var i = 0; i < 9; i++) {

            if (i % 3 == 0) {
                group = document.createElement("div");
                controller.appendChild(group);
            }
            var item = document.createElement("div");
            item.style.width = "100px";
            item.style.height = "100px";
            item.setAttribute("idx", i.toString());
            item.className = "transition item_" + i;
            item.style.display = "inline-block";

            if (i == 1) {
                item.style.backgroundImage = `url('data:image/webp;base64,UklGRn4CAABXRUJQVlA4WAoAAAAQAAAAYwAAYwAAQUxQSOoBAAABl6KgbRtmaff4Iy6MiMgiLZbT0mOypxBrM8ZaXqzIE1+feUaIzMZN43BoyBKjDCBJkqTIyd0VMzMzMw6ImZX/f4xwprsqdZRZRP8T/5snU/yBE45AfoofF1BvuOPnPMTX+fXaAulu/tiB9CF/9kF4mL9SCJ/y9xhkZ1hwXYNo0yOLliG6xeJ2SPawZA+SCcsGITjC0gx6lUuWT0FugQF3DRBrfWPIOsR2GNYNqX4GHkIqZegwhMYZfAqd2jXDZyCzwojHJoh0MmoLInuM64HEECMTSGSMHYHAFKMvK3BvuGf8AtzXafDWCudumuzA+Yg2/XAdplEK1zNajcNxlmY3dXBreqLdKty2adkJpx6a7sEpoe0QXEZonMGjckXrKTgs0vy+AeZt77Rfh/kOPbphPECXYxin9BmG6QSdzmBZd0OvWRiu0u2pCWaddNyG2T49e2A0RNcERjl9R2AyTeerCgwaH+i9BIMNur+3IbqbAjuIPqbCACKHKZEi8owaE4iao8hNHSKan6myioht6nQiuJdC+whOqDSEwFFK5QirXlFrGkFLFHtoREDbO9U2ELBLvW6UDlDwGKUpFYdRMkHJMxTX31JzDoVrFH1uRkEXZbdRcEDdXvwaonCCnx3nVJ7Ej02+PMs+8RyfVlA4IG4AAACQBgCdASpkAGQAPpFIoEylpCMioKgAsBIJaQAW2gAxtdTg4zdmw7txgN+vJ4BMMXDkdUtSAXiFi1yi8JgAAP74TQ/qWj2W4YSGwlq3h8fMEwhrrpee6FzlDNocdWdP0c4RqH7zqO4lZtZz6wAAAA==')`;
            } else if (i == 3) {
                item.style.backgroundImage = `url('data:image/webp;base64,UklGRtACAABXRUJQVlA4WAoAAAAQAAAAYwAAYwAAQUxQSDgCAAABl6KgbRtmaff4Iy6MiMgiLZbT0mOypxBrM8ZaXqzIE1+feUaIzMZN43BoyBKjDKTbtnZs2c62bdv1Irt22Od/MG++7+u6+vAvov+J/4z2DcQfPBOid+6r8oTYdat6J0KP3+iDCNxf1GcibOuOvhJBqxdf9Q0Rc+RS3xIRewr6gYjXtKUfiXCz1M9EsKFTpRChuo6URgRqWFcqEWfqXslElMGyMogYHXvKIiLUriiTCDB+rVzCvb+ofMK5dVsWhGvVwqtMCM/hSxkRft0FmRFejVsyJJxmHmVJuAydypZw6DqUNWFevyZ7wnryTg6E7WBJLoRlx66cCLuaZbkRZmNX8iOM+oryJExatuVLGFTNv8iZyB++kDuR211QACKvcVMhiKzpB8UgMoZOFIVI7jpQHCKxfk2RiLTJW4UiUiaOFYxIKSoakTR8rlhE4tyzIhGpzdsKRKT3FhWGyBm9UhAiq2ZJMYjMtl1FILIHSvInDCZv5U1Y1K/JmbDpOpArYTV0IkfCbvpBboRh46a8CNPugnwI4+ELeRDWVfMvsifsW7ZlTnj0FWVM+Ixdy5Rwql2RJeHWsSs7wnGwJCvCdfJONoRv/ZpMCO+uIxkQ/kOnyiYizDwqkwjRuKU8Ikh3QTlEmOFLpRNxqhZflUpEat1WIhGrv6gkItr4tRKIcLUr+pkI2LGnn4iQg2V9TwSdutd3RNSGdX1DxO060hci8tCpPhGxZ6l3InjTlt4eEb6noAp+wcQZ/qkAVlA4IHIAAACwBgCdASpkAGQAPpFIoEylpCMioKgAsBIJaQAW2UAxuo9YWvj1VVYVN6f8E4fjjALR1UkNDXYYUjWrLE/1AAD++FBUDHgi+eWZmLMtTX7eYKh6N7+NKNm5MMheqzt+Dd8klT7XwXtGEaPn6fo8d9QAAAA=')`;
            } else if (i == 4) {
                item.style.backgroundImage = `url('data:image/webp;base64,UklGRhQEAABXRUJQVlA4WAoAAAAQAAAAYwAAYwAAQUxQSDwCAAABl8KgkSRF1zv7zO9f7IKJiMiBMFwsGEL/QisIIxbieInVUNglZ8cJD2LCKCcvYcyc5Ew6IEu2rTrZSYB43sPdiQsQITgvuMv+/49hRJ17zhkyiOh/4p9OJd6u9wbjs9/xoFffjivwF201rx9f+cfr43VzK4KnaH/0StHraD+Ck7WjbwZ8H63BweYVg682YTx/QZWLORjOtKnWnoHV8gMVH5ZhU6dyHQaZPtX7aWhnJzRIstAt3NHkrgDN3BONHrPQS9/SbJKG2pCGQ2hVaVqFzhKNF6Ex/ULjl2kodGjeQXhMBzGCEzpIELpOF+sInNDFBGGLdLKIoD6d9BFS+qGTnxICDujmAAGndHMKefmDbj7KEG/R0RakqRYdtVIQFq/o6LoI4dwLHb3MQbj7SUefuxA26KoBYZeuuhAO6GoA4ZiuxhCe0tUphKd0dQrhmK7GEA7oagBhl666EDboqgHh7icdfe5COPdCRy9zEBav6Oi6CGGqRUetFKRbdLQFcfmdbt7LkJ/SzSkCDuhmHwGlHzr5KSKkTyd9BC3QyQLCErpIELhKFysITejgBsExHcQI79C8A4XpFxo/T0FjkcaL0KnStAqtIQ2HUEtPaDZJQy/7SKPHLDTzdzS5y0M3m9AgyUI73af6cRoGNSrXYLN8T8X7ZVjNtKnWnoHh3DlVzmdhvHnF4MsNOFg7/GLA1+EanER7o1eKXkd7ETxFW83rxzf+8fZ43dyK4K8S79R6g5PT35NBr7YTV/BPB1ZQOCCyAQAAcBAAnQEqZABkAD6RQJlJJaOioSvRzGCwEglpDqAAFtiFnzLG2AJ5Eb61zCbDRHpsFu31M2Sa4mGUK+rAdm2RPIy9wKk8l2/h85RNUDGs7KIsdVwhqVJXA1v78lDkF8YHXvc8rR2+z9PMnhWCv61sCf2ztAHGJdECLWSR4UhLQ0H+9IWHQihArwD+joAA/vzUPgajKHDYY36gpB4ufbgLQuFIR0vbtaaiQhU3MofRFiXjt9Kuz/T/9pqxWNqEofmq2s/dwnm7SxqQBXcCt3bIFV4IxUVW1n7tzGRQAh86fRUMqULUOHWRO5nr1GMDjRoBNHQQQecbas++RCdf5DUASsMETinqljh85mdAKjTgsuINrSC+qcpxJPjGdSVeKrIIjRyBGz7Cx/mBbBLqL9bg+VMX1PzvloflzHIzS+cEkDzfD9bPjz83wxeDpyl/tan+5RUzKZpRAQAazTi7fcu2P52G5TIVSkT8hkalWJWhxStBaxSHyaoxTXSGvbqpJ6xQU/gjl0VC+Mp8ChKYtc4G9JnknLEQh15U+V8+AB813V4DxWXPgtK/0jTzQdR9XAAAAAA=')`;
            } else if (i == 5) {
                item.style.backgroundImage = `url('data:image/webp;base64,UklGRswCAABXRUJQVlA4WAoAAAAQAAAAYwAAYwAAQUxQSDgCAAABl6KgbRtmaff4Iy6MiMgiLZbT0mOypxBrM8ZaXqzIE1+feUaIzMZN43BoyBKjDKTbtnZs2c62bdv1Irt22Od/MG++7+u6+vAvov+Jf6qzCfwCVQo9CP+ot60mBKfeOYvY1KfTIUSmvhx1IS71zXoDolLf3U8hKPV9eRAhqZ/2OhCQ+nmlFuGohOtxRKOSiv2IRSVutyISlfq6WIU4VPrlMMJQOYVuBKHythoRgsp8nEEEKvt0CP6UwVEXvCmTtXr4UjZ3k3ClrEqDcKTsdjvgRlmu1MKJMr0egw9lXOyDB2W+3QJ7yv5lvgrWlMfFMIwpn0I3TCmvzUYYUm4P07CjHE+GYEW5HnTBhnJeq4cF5X07CQPKvzSAbCrCbhsyqRhLNciiglyNIocKU+xFOhVouxmpVKTnOSRSsc6HkURFKyKFCnY8gRQq1O0k0qhIa/VIpOIcdCGZinIyhAwqxsM0sqgQm43IowIUupFLuV8MI59yfpmvggHlu90CE8qz2Acjyu9qDGaU23IN7Cin3Q5YUi6lQdhSDneTsKbs1+phTlkfdsGBsj0dggtl+TgDJ8pwqxFelFmhG36U0eUwPCmT14UquFIW261wpvKL/XCncq/HEYDKXKlFBCprrwMxqIzyIKJQyfdTiEOlrjcgEJV21IVQVMrpEIJRP3MW4agft5oQj/qh0IOI1LeXI4hJffO6WI2g1NedVoSlPhf7EZj6uBlHaOp9tQ6xn1TZ70R0nQ0i/kY7/jMAVlA4IG4AAADQBQCdASpkAGQAPpFIoEylpCMioKgAsBIJaQAW0cAx7XIka02Lv9NEXhZVANQXtuIttkVuItoAAP732aA9rreBRL3tw1i5taxuSDf0o56SZmqL4eIfqM4YyeUJ/tVagPzSeYxyjuW9rtmAqigAAA==')`;
            } else if (i == 7) {
                item.style.backgroundImage = `url('data:image/webp;base64,UklGRoICAABXRUJQVlA4WAoAAAAQAAAAYwAAYwAAQUxQSOkBAAABl6KgbRtmaff4Iy6MiMgiLZbT0mOypxBrM8ZaXqzIE1+feUaIzMZN43BoyBKjDCBJkqTISTEzMzOzNLMrZlb+/zHChqq8yiyi/4mvLb6+yD7zAr86L6g8hd/DFC7w95C6ffjbTdkdhNYp+tKCUMMdNecRnqTkOWIlFUcQG6TgCeJ71OtBvP2DaptIWabYYxNSaq+pNYO0MUpVkVpQaRipfRQ6QPoOdbqQ3vJClTXkzFPkth5Z59SYRN4IJUrknlBhELk9FNhF/ibdP9qR3/RI72VYzND5ugYmVfqOwmaYrgWsDujZC6suOu7Abo1uz82wq7+l1xwsJ+l0DtuSPiOwHaTLCax36dED6/YP2m/AfonmD42wr7mm9TQ8RmlcgU9B22H49NJ0H147tOyCV/Mz7dbgN0ez23o4ntNqAp4jNCrhe0ybAfj20GQX3hs0eG+Dd+MD8xfhP83sqxoIVJg7CoVhZhbQ2GdeLzS6mLUNlVVmPDVDpe6G6bPQmWDyGZRKpo5AaYCJR9DaZVoPtNrembIBtUUm3DdCreaK8WnojTJagWLB2BAUexnZh+Y2wx3QbH5iaAWqswzc1EH2jH/HoTvCPyWUj/i7H8o9/LUL7Q1+v7VCu/GeXwtQn+bnJfRPOQr9qRL/mwEAVlA4IHIAAADwBQCdASpkAGQAPpFIoEylpCMioKgAsBIJaQAAA9EADVi8jYRxeUP0cXiLb0a0xOTLWWlAvLALAAD++6g1yVkT9vH+RgJANfgCBmK6FVNJNAvLJTrsyCFfTlZABXxh1kkQ+/H9GFItKFQ0K/hHAAAAAAA=')`;
            } else if (i == 8) {
                item.style.verticalAlign = "middle";
                item.style.lineHeight = "100px";
                item.style.textAlign = "center";
                item.style.backgroundColor = "rgba(0,0,0,0.5)";
                item.innerHTML = "Mix";
            }
            if (group)
                group.appendChild(item);
        }
        document.body.appendChild(controller);
        controller.addEventListener("mousedown", (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.target.style.transform = "scale(0.8)";
            timer = setTimeout(() => {
                e.target.style.transform = "scale(1)";
            }, 500);

            if (e.target.getAttribute("idx") == "1") {
                fireKeyEvent(document.documentElement, "keydown", 38);
            } else if (e.target.getAttribute("idx") == "3") {
                fireKeyEvent(document.documentElement, "keydown", 37);
            } else if (e.target.getAttribute("idx") == "4") {
                fireKeyEvent(document.documentElement, "keydown", 13);

            } else if (e.target.getAttribute("idx") == "5") {
                fireKeyEvent(document.documentElement, "keydown", 39);
            } else if (e.target.getAttribute("idx") == "7") {
                fireKeyEvent(document.documentElement, "keydown", 40);
            } else if (e.target.getAttribute("idx") == "8") {

                if (showing) {
                    webui.OnLoseFocus();
                } else {
                    webui.OnFocus();
                }
                showing = !showing;
            } else {
                isDragging = true;
                mouseoffsetX = e.pageX - controller.offsetLeft;
                mouseoffsetY = e.pageY - controller.offsetTop;
            }
        })
        controller.addEventListener("mousemove", (e) => {

            if (isDragging) {
                controller.style.left = (e.pageX - mouseoffsetX) + 'px';
                controller.style.top = (e.pageY - mouseoffsetY) + 'px';

            }
        })
        controller.addEventListener("mouseup", (e) => {
            isDragging = false;
            e.target.style.transform = "scale(1)";
            if (typeof focusmove == "object" && focusmove.actived && focusmove.actived.element) {
                focusmove.actived.element.focus();
            }
        });

        function fireKeyEvent(el, evtType, keyCode) {
            var doc = el.ownerDocument,
                win = doc.defaultView,
                evtObj;
            if (doc.createEvent) {
                if (win.KeyEvent) {
                    evtObj = doc.createEvent('KeyEvents');
                    evtObj.initKeyEvent(evtType, true, true, win, false, false, false, false, keyCode, 0);
                } else {
                    evtObj = doc.createEvent('UIEvents');
                    Object.defineProperty(evtObj, 'keyCode', {
                        get: function () {
                            return this.keyCodeVal;
                        }
                    });
                    Object.defineProperty(evtObj, 'which', {
                        get: function () {
                            return this.keyCodeVal;
                        }
                    });
                    evtObj.initUIEvent(evtType, true, true, win, 1);
                    evtObj.keyCodeVal = keyCode;
                }
                el.dispatchEvent(evtObj);
            }
        }
        return controller;
    },
    hide() {
        var controller = document.getElementById("controller_simulator");
        if (controller != null) {
            document.body.removeChild(controller);
            controller = null;
        }
    }
}