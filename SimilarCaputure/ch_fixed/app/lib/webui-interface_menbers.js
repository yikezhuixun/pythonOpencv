var webuiInterface = {
    Init: callback => {
        setTimeout(function () {
            callback(true);
        }, 300);
    },
    GetApiVersion: () => {
        return "1.0.0 interface"
    },
    RegisterSessionOwner: () => {},
    GetAppList: (callback => {
        setTimeout(function () {
            callback({res:0,apps:["Netflix","YouTube main","netrange","Twitter","screencast",,"freeshare","Globoplay","OpenBrowser"]});
        }, 300);
    }),
    OpenApp: (name, args, cb) => {
        cb({
            res: 0,
            appName: name
        });
    },
    GetSourceList: (callback) => {
        var data = {
            res: 0,
            sourceList: [
                "atv",
                "dtv",
                "hdmi 1",
                "hdmi 2",
                "hdmi 3",
                "pc",
                "ypbpr",
            ]
        };
        setTimeout(function () {
            callback(data);
        }, 300);
    },
    ReturnToInputSource: () => {},
    SetInputSource: (s, cb) => {
        cb({
            res: 0,
            inputSource: s
        });
    },
    GetCurrentInputSource: (cb) => {
        cb({
            res: 0,
            inputSource: "hdmi 1"
        });
    },
    GetNFXTiles: (cb) => {
        cb({
            res: 0,
            groups: [{
                "groupIndex": 0,
                "groupType": "signup",
                "tiles": [{
                    "deepLink": "tileSignup=true&source_type_payload=groupIndex=0&tileIndex=0&action=signup",
                    "expiry": 2533140140,
                    "groupIndex": 0,
                    "height": 247,
                    "playable": false,
                    "shortText": "Start your free month",
                    "tileIndex": 0,
                    "title": "Watch TV shows and movies anytime, anywhere",
                    "url": "http://www.tv321.cn/webui/account.png",
                    "width": 247
                }],
                "title": "Mstar"
            }, {
                "groupIndex": 1,
                "groupType": "onRamp",
                "tiles": [{
                    "action": "mdp",
                    "bookmark": 0,
                    "deepLink": "m=80993655&trackId=15539201&showMovieInfoOnly=true&source_type_payload=groupIndex=1&tileIndex=0&action=mdp&movieId=80993655&trackId=15539201",
                    "description": "Start your free month to access thousands of TV shows, movies and Netflix Originals",
                    "expiry": 2533140141,
                    "groupIndex": 1,
                    "height": 168,
                    "maturityRating": "13+",
                    "movieId": 80993655,
                    "playable": false,
                    "runtime": 7144,
                    "shortText": "",
                    "tileIndex": 0,
                    "title": "Us and Them",
                    "trackId": 15539201,
                    "url": "http://occ-0-325-58.1.nflxso.net/art/3bcca/fb9150e62374e066b097c80ccaed7f6a53c3bcca.jpg",
                    "width": 300
                }, {
                    "action": "mdp",
                    "bookmark": 0,
                    "deepLink": "m=80117470&trackId=15539201&showMovieInfoOnly=true&source_type_payload=groupIndex=1&tileIndex=1&action=mdp&movieId=80117470&trackId=15539201",
                    "description": "Start your free month to access thousands of TV shows, movies and Netflix Originals",
                    "expiry": 2533140141,
                    "groupIndex": 1,
                    "height": 168,
                    "maturityRating": "16+",
                    "movieId": 80117470,
                    "playable": false,
                    "runtime": 0,
                    "shortText": "",
                    "tileIndex": 1,
                    "title": "13 Reasons Why",
                    "trackId": 15539201,
                    "url": "http://occ-2-325-58.1.nflxso.net/art/bdd26/53655e587f2f078b8d80704a8d688791b11bdd26.jpg",
                    "width": 300
                },{
                    "action": "mdp",
                    "bookmark": 0,
                    "deepLink": "m=70264888&trackId=15539201&showMovieInfoOnly=true&source_type_payload=groupIndex=1&tileIndex=2&action=mdp&movieId=70264888&trackId=15539201",
                    "description": "Start your free month to access thousands of TV shows, movies and Netflix Originals",
                    "expiry": 2533140141,
                    "groupIndex": 1,
                    "height": 168,
                    "maturityRating": "16+",
                    "movieId": 70264888,
                    "playable": false,
                    "runtime": 0,
                    "shortText": "",
                    "tileIndex": 2,
                    "title": "Black Mirror",
                    "trackId": 15539201,
                    "url": "http://occ-2-325-58.1.nflxso.net/art/514a2/ebc68a3455c09f10d32e1c0b02afb7df7aa514a2.jpg",
                    "width": 300
                }],
                "title": "Continue Watching for Mstar"
            },{
                "groupIndex": 0,
                "groupType": "signup",
                "tiles": [{
                    "action": "mdp",
                    "bookmark": 0,
                    "deepLink": "m=80178943&trackId=15539201&showMovieInfoOnly=true&source_type_payload=groupIndex=1&tileIndex=3&action=mdp&movieId=80178943&trackId=15539201",
                    "description": "Start your free month to access thousands of TV shows, movies and Netflix Originals",
                    "expiry": 2533140141,
                    "groupIndex": 1,
                    "height": 168,
                    "maturityRating": "7+",
                    "movieId": 80178943,
                    "playable": false,
                    "runtime": 0,
                    "shortText": "",
                    "tileIndex": 3,
                    "title": "The Boss Baby: Back in Business",
                    "trackId": 15539201,
                    "url": "http://occ-2-325-58.1.nflxso.net/art/ac36a/ae7dc8397909aaecd2bc09020fad448b965ac36a.jpg",
                    "width": 300
                }, {
                    "action": "mdp",
                    "bookmark": 0,
                    "deepLink": "m=80206300&trackId=15539201&showMovieInfoOnly=true&source_type_payload=groupIndex=1&tileIndex=4&action=mdp&movieId=80206300&trackId=15539201",
                    "description": "Start your free month to access thousands of TV shows, movies and Netflix Originals",
                    "expiry": 2533140141,
                    "groupIndex": 1,
                    "height": 168,
                    "maturityRating": "16+",
                    "movieId": 80206300,
                    "playable": false,
                    "runtime": 6929,
                    "shortText": "",
                    "tileIndex": 4,
                    "title": "Annihilation",
                    "trackId": 15539201,
                    "url": "http://occ-1-325-58.1.nflxso.net/art/3768c/8d57bf8ba99477f3669caedf2aa2949fd283768c.jpg",
                    "width": 300
                }, {
                    "action": "mdp",
                    "bookmark": 0,
                    "deepLink": "m=70153404&trackId=15539201&showMovieInfoOnly=true&source_type_payload=groupIndex=1&tileIndex=5&action=mdp&movieId=70153404&trackId=15539201",
                    "description": "Start your free month to access thousands of TV shows, movies and Netflix Originals",
                    "expiry": 2533140141,
                    "groupIndex": 1,
                    "height": 168,
                    "maturityRating": "13+",
                    "movieId": 70153404,
                    "playable": false,
                    "runtime": 0,
                    "shortText": "",
                    "tileIndex": 5,
                    "title": "Friends",
                    "trackId": 15539201,
                    "url": "http://occ-0-325-58.1.nflxso.net/art/c1b11/1977b6d1b5fecfe396a7df337c2189b44dbc1b11.jpg",
                    "width": 300
                }, {
                    "action": "mdp",
                    "bookmark": 0,
                    "deepLink": "m=80088567&trackId=15539201&showMovieInfoOnly=true&source_type_payload=groupIndex=1&tileIndex=6&action=mdp&movieId=80088567&trackId=15539201",
                    "description": "Start your free month to access thousands of TV shows, movies and Netflix Originals",
                    "expiry": 2533140141,
                    "groupIndex": 1,
                    "height": 168,
                    "maturityRating": "16+",
                    "movieId": 80088567,
                    "playable": false,
                    "runtime": 8963,
                    "shortText": "",
                    "tileIndex": 6,
                    "title": "Captain America: Civil War",
                    "trackId": 15539201,
                    "url": "http://occ-0-325-58.1.nflxso.net/art/0e813/17a99fb848df7c9d9de1bbd31eeb208d19c0e813.jpg",
                    "width": 300
                }, {
                    "action": "mdp",
                    "bookmark": 0,
                    "deepLink": "m=80214405&trackId=15539201&showMovieInfoOnly=true&source_type_payload=groupIndex=1&tileIndex=7&action=mdp&movieId=80214405&trackId=15539201",
                    "description": "Start your free month to access thousands of TV shows, movies and Netflix Originals",
                    "expiry": 2533140141,
                    "groupIndex": 1,
                    "height": 168,
                    "maturityRating": "13+",
                    "movieId": 80214405,
                    "playable": false,
                    "runtime": 0,
                    "shortText": "",
                    "tileIndex": 7,
                    "title": "A Korean Odyssey",
                    "trackId": 15539201,
                    "url": "http://occ-2-325-58.1.nflxso.net/art/ae9e5/fcb47367bac5ba0be3563d07473f620b387ae9e5.jpg",
                    "width": 300
                }, {
                    "action": "mdp",
                    "bookmark": 0,
                    "deepLink": "m=81000509&trackId=15539201&showMovieInfoOnly=true&source_type_payload=groupIndex=1&tileIndex=8&action=mdp&movieId=81000509&trackId=15539201",
                    "description": "Start your free month to access thousands of TV shows, movies and Netflix Originals",
                    "expiry": 2533140141,
                    "groupIndex": 1,
                    "height": 168,
                    "maturityRating": "16+",
                    "movieId": 81000509,
                    "playable": false,
                    "runtime": 0,
                    "shortText": "",
                    "tileIndex": 8,
                    "title": "On Children",
                    "trackId": 15539201,
                    "url": "http://occ-0-325-58.1.nflxso.net/art/e7743/0f6ada0538abe1190f07e4ae3424896a917e7743.jpg",
                    "width": 300
                }, {
                    "action": "mdp",
                    "bookmark": 0,
                    "deepLink": "m=80209553&trackId=15539201&showMovieInfoOnly=true&source_type_payload=groupIndex=1&tileIndex=9&action=mdp&movieId=80209553&trackId=15539201",
                    "description": "Start your free month to access thousands of TV shows, movies and Netflix Originals",
                    "expiry": 2533140141,
                    "groupIndex": 1,
                    "height": 168,
                    "maturityRating": "13+",
                    "movieId": 80209553,
                    "playable": false,
                    "runtime": 0,
                    "shortText": "",
                    "tileIndex": 9,
                    "title": "Busted!",
                    "trackId": 15539201,
                    "url": "http://occ-1-325-58.1.nflxso.net/art/921a0/68d90237b6658b42065a2f4fc2ee2a9a1c8921a0.jpg",
                    "width": 300
                }],
                "title": "Trending Now"
            }]
        });

    },
    OpenNativeUI: () => {},
    GetNetworkInfo: (args) => {
        args({
            res: 0,
            isConnected: true,
            isWireless: true,
            wifiSignal: 2,
        });
    },
    GetUsbInfo: (cb) => {
        cb({
            res: 0,
            hasStorage: false
        });
    },
    Echo: () => {},
    ErrorStrings: [ // need to match with EN_WEBUI_RESULT defined in Types.h
        "OK",
        "Invalid arguments",
        "No resource",
        "Timeout",
        "Internal error"
    ],
    OnFocus: null, //to be filled with a callback
    OnLoseFocus: null, //to be filled with a callback
    OnNFXTilesUpdate: null, //to be filled with a callback
    OnLanguageChange: null, //to be filled with a callback
    OnNetworkChange: null, //to be filled with a callback
    OnUsbStorageChange: null //to be filled with a callback
};

var LOG = ["ERROR", "WARN", "INFO", "DEBUG", "VERBOSE"],
    gLogLevel = 4,
    gLogTimestamp = !0;

function _log(a, b) {
    var d = gLogTimestamp ? (new Date).toISOString() : "";
    a < gLogLevel && console.log(d + "[WEBUI][" + LOG[a] + "]" + b)
}
var mlogInterface = {
    e: function (a) {
        _log(0, a)
    },
    w: function (a) {
        _log(1, a)
    },
    i: function (a) {
        _log(2, a)
    },
    d: function (a) {
        _log(3, a)
    },
    v: function (a) {
        _log(4, a)
    },
    setLevel: function (a) {
        gLogLevel = a
    }
};
export {
    webuiInterface,
    mlogInterface
}