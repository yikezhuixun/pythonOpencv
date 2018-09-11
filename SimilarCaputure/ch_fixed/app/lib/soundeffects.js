(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], function (exports) {
            factory((root.SoundEffects = exports));
        });
    } else if (typeof exports === 'object') {
        factory(exports);
    } else {
        factory((root.SoundEffects = {}));
    }
}(this, function (exports) {
    var audioCtx = null;
    var audioData = {};
    var files = {
        move: 'asset/sound/move.wav',
        plop: 'asset/sound/plop.wav'
    };
    exports.enable = false;
    exports.EffectsType = {
        MOVE: "move",
        PLOP: "plop"
    };
    exports.loadSound = function () {
        if (!this.enable) return;
        for (let key in files) {
            const request = new XMLHttpRequest();
            request.open('GET', files[key], true);
            request.responseType = 'arraybuffer';
            request.onload = () => {
                audioData[key] = request.response;
            };
            request.send();
        }

    }
    exports.playSound = function (type) {
        if (!this.enable) return;
        if (audioCtx == null) {
            audioCtx = new AudioContext();
        }
        var data = audioData[type];
        if (data) {
            data = audioData[type].slice(0);
            audioCtx.decodeAudioData(data,
                function (buffer) {
                    var source = audioCtx.createBufferSource();
                    source.buffer = buffer;
                    source.connect(audioCtx.destination);
                    source.start(0);
                },
                function () {
                    mlog.e("Error decoding audio data");
                });
        }
    }
    exports.release = function () {
        if (!this.enable) return;
        if (audioCtx != null) {
            if (AudioContext.prototype.close != undefined)
                audioCtx.close();
            audioCtx = null;
        }
    }

}));