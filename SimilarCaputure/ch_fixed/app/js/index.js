 import FocusMove from '../lib/focusmove.js';
 //require('./refreshrem.js');
 import CtrlSimulator from '../lib/controlsimulator.js';
 import AppData from './appdata.js';
 import {
     webuiInterface,
     mlogInterface
 } from '../lib/webui-interface.js';
 import Util from './utils.js';
 import SoundEffects, {
     EffectsType
 } from '../lib/soundeffects.js';
 import _ from 'lodash';
 import velocity from 'velocity-animate';
 import sLog from './sLog.js';

 sLog.enable = false;
 const screenWidth = 1920,
     screenHeight = 1080,
     zoom = screenWidth / 1920,
     nfxHeight = 237 * zoom,
     isDebug = false;
 let currentInputSource = null;
 let appPageData = [];
 let appPageSize = 6;
 let currentPage = -1;
 window.onload = () => {
     if (isDebug || typeof window.webui == "undefined" || navigator.userAgent.indexOf("MStar") == -1) {
         window.webui = webuiInterface;
         window.mlog = mlogInterface;
         window.toggleMedia = toggleMedia;
         window.checkNetwork = checkNetwork;
         document.body.style.backgroundImage = "url('asset/hdv.jpg')";
     } else {
         webui = window.webui;
     }
     ready();
     webui.Init((ok) => {
         if (ok) {
             initVars();
             updateNfxTiles();
             AppData.getSourceList().then(data => {
                 const sourcelist = data.map((item) => {
                     if (!item.hasOwnProperty("icon")) {
                         item.icon = getIconPath(item.name) + ".png";
                     }
                     return item;
                 })
                 layoutInputSource(sourcelist);
             }).catch(function (e) {
                 console.error(e);
             });
             webui.GetSourceList();
             //  webui.GetSourceList((args) => {
             //      if (args.res == 0) {
             //          layoutInputSource(args.sourceList);
             //      } else
             //          mlog.e("Failed to get source list: " + webui.ErrorStrings[args.res]);
             //  });
         } else {
             mlog.e("webui init failure.");
         }
     });
     webui.OnFocus = (appName) => {
         sLog.d("webui.OnFocus  appName = " + appName);
         webui.GetCurrentInputSource((args) => {
             if (args.res == 0) {
                 currentInputSource = args.inputSource;
                 mlog.d("The current input source is " + args.inputSource);
             } else
                 mlog.e("Failed to get current input source: " + webui.ErrorStrings[args.res]);
         });
         const app = document.getElementById("app-markup");
         app.style.transform = "translateY(0px)";

         if (appName == null) {
             appName = "Netflix";
         }
         const pos = findPosition(appName);
         switchRow("#apps", pos[0], pos[1]);
         checkNetwork();
     };
     webui.OnLoseFocus = () => {
         switchRow("#apps");
         const app = document.getElementById("app-markup");
         app.style.transform = "translateY(" + screenHeight + "px)";
         SoundEffects.release();
     };

 };

 function findPosition(appName) {
     let i = -1;
     let j = -1;
     for (i = 0; i < appPageData.length; i++) {
         j = appPageData[i].findIndex((item) => {
             return item.name === appName;
         });
         if (j !== -1) {
             return [i, j];
         }
     }
     return [0, 0];
 }

 function initVars() {
     webui.GetCurrentInputSource((args) => {
         if (args.res == 0) {
             currentInputSource = args.inputSource;
             mlog.d("The current input source is " + args.inputSource);
         } else
             mlog.e("Failed to get current input source: " + webui.ErrorStrings[args.res]);
     });
     var settings = document.getElementById("settings");
     settings["fm-down"] = () => {
         if (document.getElementById("usbdevice").style.display == "none") {
             switchRow("#apps");
         } else {
             switchRow("#usbdevice");
         }
     };
     settings["fm-click"] = () => {
         openNativeUI("open_settings: default");
     };
     Promise.all([AppData.getConfig(), AppData.getApplist()]).then((result) => {
         if (result[0].enbaleSound) {
             SoundEffects.enable = result[0].enbaleSound;
             SoundEffects.loadSound();
         }
         appPageSize = result[0].appPageSize;
         let data = result[1];
         const apps = data.map((item) => {
             if (!item.hasOwnProperty("icon")) {
                 item.icon = getIconPath(item.name) + ".png";
             }
             return item;
         })
         createPageData(apps);
         switchRow("#apps", 0, 0);
     });

     //  webui.GetAppList(args => {
     //      var apps = [];
     //      if (args.res == 0) {
     //          var list = args.apps;
     //          _.remove(list, function (v) {
     //              return v == "Netflix";
     //          });
     //          list.unshift("Netflix");

     //          list.forEach((item, idx) => {
     //              apps.push({
     //                  name: item,
     //                  icon: getIconPath(item) + ".png"
     //              });
     //          });
     //          gAppsData = apps;
     //          initIconCache(apps);
     //          layoutAppList(apps);
     //      } else {

     //          mlog.e("Failed to get app list: " + webui.ErrorStrings[args.res]);
     //      }
     //  });

     checkNetwork();
     checkMedia();
 }

 function createPageData(apps = []) {
     if (apps.length > appPageSize + 1) {
         appPageData = [apps.slice(0, appPageSize).concat({
             name: "More",
             icon: "more1.png",
         }), [{
             name: "Back",
             icon: "back1.png",
         }].concat(apps.slice(appPageSize))];
     } else {
         appPageData = [apps];
     }

 }

 function showPage(page) {

     if (currentPage != page && appPageData.length > 0) {
         layoutAppList(appPageData[page]);
         currentPage = page;
     }
 }

 function getIconPath(path) {
     return path.toLowerCase().replace(/\s/g, "");
 }

 function ready() {
     mlog.d("[HOME]dom is ready.");
     document.addEventListener("mousedown", e => {
         const controller = CtrlSimulator.show(FocusMove);
         controller.style.left = e.pageX + 'px';
         controller.style.top = e.pageY + 'px';
     })
     document.addEventListener("keyup", e => {
         CtrlSimulator.hide();
     })
     initFocusMove();
     processDateTime();

     webui.OnNetworkChange = checkNetwork;
     webui.OnNFXTilesUpdate = updateNfxTiles;
     webui.OnUsbStorageChange = checkMedia;
     webui.OnUsbStorageMount = checkMedia;
     webui.OnUsbStorageUnmount = checkMedia;

 }

 function updateNfxTiles() {
     webui.GetNFXTiles(function (args) {
         sLog.d("GetNFXTiles arg.res = " + args.res + " args.groups.length = " + args.groups.length);
         if (args.res === 0 && args.groups.length > 0) {
             layoutNetflix(args.groups);
         } else {
             mlog.e("Failed to get NFX list: " + webui.ErrorStrings[args.res]);
             showNetflixIcon();

         }
     })
 }

 function showNetflixIcon() {
     var groups = [];
     groups = [{
         tiles: [{
             description: "NETFLIX",
             height: 140 * zoom,
             title: "Open NETFLIX",
             url: "asset/icon/app/netflix.png",
             width: 250 * zoom,
         }],
         title: "NETFLIX",
     }];
     layoutNetflix(groups);
 }

 function checkNetwork(checkPreapp = false) {
     webui.GetNetworkInfo((args) => {
         if (args.res == 0) {
             showNetworkStatus(args, checkPreapp);
         } else {
             mlog.e("Failed get Network info: " + webui.ErrorStrings[args.res]);
         }
     })
 }

 function showNetworkStatus(args, checkPreapp) {
     if (args.isWireless == true) {
         const icon = "asset/icon/network/ic_home_status_wifi_" + args.wifiSignal + ".png";
         document.getElementById("network").style.backgroundImage = `url(${icon})`;
     } else {
         if (args.isConnected == true) {
             document.getElementById("network").style.backgroundImage = "url(asset/icon/network/ic_home_status_wired.png)";
             updateNfxTiles();
         } else {
             document.getElementById("network").style.backgroundImage = "url(asset/icon/network/ic_home_status_wired_disconnect.png)";
             showNetflixIcon();
         }
     }

     if (args.isConnected || (args.isWireless && args.wifiSignal > 0)) {
         updateNfxTiles();
     } else if (checkPreapp) {
         showNetflixIcon();
     }
 }

 function checkMedia() {
     webui.GetUsbInfo((args) => {
         if (args.res == 0) {
             toggleMedia(args.hasStorage);
         } else
             mlog.e("Failed get USB info: " + webui.ErrorStrings[args.res]);
     });
 }

 function toggleMedia(hasStorage) {
     if (hasStorage) {
         layoutUsb();
     } else {
         removeUsb();
     }
 }

 function removeUsb() {

     var usbdevice = document.getElementById("usbdevice");
     document.querySelector("#usbdevice .content-container").innerHTML = "";
     usbdevice.style.height = 280 * zoom + "px";
     // velocity.animate(usbdevice, "stop");


     /*velocity.animate(usbdevice, {
         height: 0
     }, {
         duration: 200,
         complete: () => {
             usbdevice.style.display = "none";
             FocusMove.init(false);
             document.querySelector(".content-container-v").style.transform = "translateY(0px)";
             if (FocusMove.actived.element.id.indexOf("usb_") != -1) {
                 switchRow("#apps");
             } else {
                 moveFloatFrame();
             }
         }
     })*/

     usbdevice.style.height = "0px";
     FocusMove.init(false);
     document.querySelector(".content-container-v").style.transform = "translateY(0px)";
     if (FocusMove.actived.element.id.indexOf("usb_") != -1) {
         switchRow("#apps");
     } else {
         moveFloatFrame();
     }

     document.getElementById("arrawtip").style.display = "none";
 }

 function layoutUsb() {
     mlog.d("layoutUsb");
     var usbdevice = document.getElementById("usbdevice");
     usbdevice.style.display = "block";
     const container = document.querySelector("#usbdevice .content-container");
     container.innerHTML = "";
     const list = ["movie", "music", "photo"];
     const len = list.length;
     for (let i = 0; i < len; i++) {
         const left = i == 0 ? '-1' : 'usb_' + list[i - 1];
         const right = (i == len - 1) ? '-1' : 'usb_' + list[i + 1];
         const item = document.createElement("div");
         item.id = "usb_" + list[i];
         item.tabIndex = "-1";
         item.className = "item";
         item.setAttribute("fm-left", left);
         item.setAttribute("fm-right", right);
         item["fm-down"] = () => {
             switchRow("#apps");
         }

         item["fm-click"] = () => {
             webui.OpenNativeUI(`open_media_player: ${list[i]}`, (args) => {
                 if (args.res == 0)
                     mlog.d("Native UI has been opened");
                 else
                     mlog.e("Failed to open Native UI: " + webui.ErrorStrings[args.res]);
             });
         }
         item.style.backgroundImage = `url('asset/icon/usb/usb_${list[i]}.png')`;
         container.appendChild(item);
         usbdevice.style.height = "0px";
         // velocity.animate(usbdevice, "stop");
         /*velocity.animate(usbdevice, {
             height: 280 * zoom
         }, {
             duration: 200,
             complete: () => {
                 switchRow("#usbdevice");
                 //  moveFloatFrame(true);
             }
         });*/

         usbdevice.style.height = 280 * zoom+"px";
         switchRow("#usbdevice");
     }
     FocusMove.init(false);
     document.getElementById("arrawtip").style.display = "block";
     Util.removeClass(document.getElementById("arrawtip"), "up");
     Util.addClass(document.getElementById("arrawtip"), "down");
     //switchRow("#usbdevice");

 }

 function moveFloatFrame(quick = false) {
     var o = FocusMove.actived.element;
     var mf = document.getElementById('floatframe');
     var rect = o.getBoundingClientRect();
     var bl = parseInt(getComputedStyle(mf)["borderLeftWidth"]);
     var bt = parseInt(getComputedStyle(mf)["borderTopWidth"]);
     velocity.animate(mf, "stop");
     velocity.animate(mf, {
         top: rect.top - bt,
         left: rect.left - bl,
         width: rect.width,
         height: rect.height
     }, {
         duration: quick ? 100 : 200
     })

 }

 function initFocusMove() {
     mlog.d("initFocusMove");
     FocusMove.ready({
         distmode: FocusMove.DistMode.EDGE
     });
     FocusMove.onFocus = o => {
         moveFloatFrame();
         if (!doScroll(o)) {
             moveFloatFrame();
         }
         SoundEffects.playSound(SoundEffects.EffectsType.MOVE);

     }
     FocusMove.addEvent({
         key: 13,
         before: true,
         fun: o => {
             SoundEffects.playSound(SoundEffects.EffectsType.PLOP);
         }

     });
     document.addEventListener("transitionend", function (e) {
         if (e.target == FocusMove.actived.element || Util.hasClass(e.target, "content-container") || Util.hasClass(e.target, "content-container-v")) {
             moveFloatFrame();
         }
     });
 }

 function processDateTime() {
     var date = new Date();
     document.getElementById("date").innerHTML = (date.getMonth() + 1) + "." + date.getDay() + "." + date.getFullYear();
     var timer = setInterval(function () {
         var d = new Date();
         document.getElementById("time").innerHTML = d.getHours() + ":" + zerofill(d.getMinutes()); // + ":" + zerofill(d.getSeconds());
     }, 1000);

     function zerofill(s) {
         return s < 10 ? '0' + s : s;
     }
 }

 function doScroll(obj) {
     var marginLeft = 40 * zoom,
         marginRight = 40 * zoom,
         marginTop = 10 * zoom,
         marginBottom = 20 * zoom;
     var needAnimateH = false,
         needAnimateV = false;
     var docRect = document.documentElement.getBoundingClientRect();
     var rect = obj.getBoundingClientRect();
     if (docRect.width == 0 || docRect.height == 0) return false;

     if (rect.left + rect.width + marginRight > docRect.width) {
         var p = Util.parents(obj, ".content-container");
         if (p) {
             var t = Util.getElementTranslate(p);
             var x = docRect.width - rect.left - rect.width - marginRight + t.x;
             p.style.transform = "translateX(" + x + "px)";
             needAnimateH = x !== t.x;
         }
     } else if (rect.left < marginLeft) {
         var p = Util.parents(obj, ".content-container");
         if (p) {
             var t = Util.getElementTranslate(p);
             var x = t.x - rect.left + marginLeft;
             p.style.transform = "translateX(" + x + "px)";
             needAnimateH = x !== t.x;
         }
     }
     if (rect.top + rect.height + marginBottom > docRect.height) {
         var p = Util.parents(obj, ".content-container-v");
         if (p) {
             var t = Util.getElementTranslate(p);
             var y = docRect.height - rect.top - rect.height - marginBottom + t.y - 10;
             p.style.transform = "translateY(" + y + "px)";
             needAnimateV = y !== t.y;
         }

     } else if (rect.top < marginTop) {

         var p = Util.parents(obj, ".content-container-v");
         if (p) {
             var t = Util.getElementTranslate(p);
             var y = t.y - rect.top + marginTop;
             p.style.transform = "translateY(" + y + "px)";
             needAnimateV = y !== t.y;
         }
     }
     return needAnimateH || needAnimateV;
 }


 function initIconCache(apps = []) {
     for (var i = 0; i < apps.length; i++) {
         var item = document.createElement("img");
         item.style.display = 'none';
         item.src = `asset/icon/app/${apps[i].icon}`;
         document.body.appendChild(item);
     }

 }


 function layoutAppList(apps = []) {
     mlog.d("layoutAppList");
     var len = apps.length;
     var container = document.querySelector("#apps .content-container");
     container.innerHTML = '';

     for (var i = 0; i < len; i++) {

         const left = i === 0 ? ('app_' + (len - 1)) : ('app_' + (i - 1));
         const right = (i === len - 1) ? 'app_0' : 'app_' + (i + 1);
         const item = document.createElement("div");
         item.id = "app_" + i;
         item.tabIndex = "-1"
         item.className = "item link";
         item.setAttribute("fm-left", left);
         item.setAttribute("fm-right", right);
         item.setAttribute("fm-up", "-1");
         item.setAttribute("fm-down", "nfx_0");
         item["fm-up"] = () => {
             if (document.getElementById("usbdevice").style.display == "none") {
                 switchRow("#topbanner");
             } else {
                 switchRow("#usbdevice");
             }
         }
         item["fm-down"] = () => {
             if (!switchRow("#netflix")) {
                 switchRow("#inputs");
             }
         };
         item.style.backgroundColor = apps[i].color;
         item.style.backgroundImage = `url('asset/icon/app/${apps[i].icon}')`;

         if (apps[i].name == "More") {
             item["fm-click"] = () => {
                 switchRow("#apps", 1);
             };
             item.style.backgroundImage = `url('asset/icon/app/more1.png')`;
             item.onblur = function () {
                 this.style.backgroundImage = `url('asset/icon/app/more1.png')`;
             }
             item.onfocus = function () {
                 this.style.backgroundImage = `url('asset/icon/app/more2.png')`;
             }
         } else if (apps[i].name == "Back") {
             item["fm-click"] = () => {
                 switchRow("#apps", 0);
             };
             item.style.backgroundImage = `url('asset/icon/app/back1.png')`;
             item.onblur = function () {
                 this.style.backgroundImage = `url('asset/icon/app/back1.png')`;
             }
             item.onfocus = function () {
                 this.style.backgroundImage = `url('asset/icon/app/back2.png')`;
             }
         } else if (apps[i].hasOwnProperty("type") && apps[i].type == "nativeui") {
             item.setAttribute("fm-click", "this.openNativeUI('" + (apps[i].hasOwnProperty("action") ? apps[i].action : apps[i].name) + "')");
             item.openNativeUI = openNativeUI;
         } else {
             item.setAttribute("fm-click", "this.openApp('" + apps[i].name + "')");
             item.openApp = openApp;
         }
         container.appendChild(item);

     }
     FocusMove.init(false);
     document.getElementById("floatframe").style.visibility = 'visible';
 }

 var currentRowID = "#apps";

 function switchRow(destination, page = 0, index = 0) {
     // console.log("switch row from " + currentRowID + " to " + destination + " page = " + page + " index  = " + index);
     if (currentRowID != "#topbanner") {
         // document.querySelector(currentRowID + " .content-container").style.transitionDuration="10ms"; 
         document.querySelector(currentRowID + " .content-container").style.transform = "translateX(" + 40 * zoom + "px)";
         document.querySelector(currentRowID + " .content").scrollLeft = 0;
         //document.querySelector(currentRowID + " .content-container").style.transitionDuration="300ms";
     }
     if (currentRowID === "#apps" && destination !== "#apps") {
         showPage(0);
     }
     switch (destination) {
         case "#topbanner":
             FocusMove.setFocus(document.getElementById("settings"));
             break;
         case "#usbdevice":
             FocusMove.setFocus(document.getElementById("usb_movie"));
             break;
         case "#apps":
             const hcontainer = document.querySelector("#app-markup>.content-container-v");
             if (hcontainer) {
                 hcontainer.style.transform = "translateY(0px)";
                 hcontainer.parentElement.scrollTop = 0;
             }
             showPage(page);
             FocusMove.setFocus(document.getElementById("app_" + index));
             Util.removeClass(document.getElementById("arrawtip"), "up");
             Util.addClass(document.getElementById("arrawtip"), "down");
             break;
         case "#netflix":
             if (document.getElementById("nfx_0") == null) {
                 return false;
             }
             FocusMove.setFocus(document.getElementById("nfx_0"));
             break;
         case "#inputs":
             const inputEle = document.querySelector("#inputs .item .current");
             if (inputEle && inputEle.parentElement) {
                 FocusMove.setFocus(inputEle.parentElement);
             } else {
                 FocusMove.setFocus(document.querySelector("#input_0"));
             }
             Util.removeClass(document.getElementById("arrawtip"), "down");
             Util.addClass(document.getElementById("arrawtip"), "up");
             break;
     }
     currentRowID = destination;
     return true;
 }

 function openApp(appName) {
     webui.OpenApp(appName, null, (args) => {
         if (args.res == 0)
             mlog.d("Open app, name = '"+args.appName + "', note: name is case sensitive");
         else
             mlog.e("Failed to open " + args.appName + ": " + webui.ErrorStrings[args.res]);
     });
 }

 function layoutInputSource(sourceList = []) {

     mlog.d("layoutInputSource");
     const container = document.querySelector("#inputs .content-container");
     container.innerHTML = "";
     for (var i = 0; i < sourceList.length; i++) {

         var left = i == 0 ? -1 : 'input_' + (i - 1);
         var right = (i == sourceList.length - 1) ? '-1' : 'input_' + (i + 1);
         var icon = sourceList[i].icon;
         var item = document.createElement("div");
         item.id = "input_" + i;
         item.className = "item link";
         item.tabIndex = "-1";
         item.title = sourceList[i].name;
         item.setAttribute("name", sourceList[i].name);
         item.setAttribute("fm-left", left);
         item.setAttribute("fm-right", right);
         item["fm-up"] = () => {
             if (!switchRow("#netflix")) {
                 switchRow("#apps");
             }
         };
         item.setAttribute("fm-click", `this.switchInputSource('${sourceList[i].name}')`);
         item.switchInputSource = switchInputSource;
         item.style.backgroundImage = `url('asset/icon/input/${icon}')`;
         container.appendChild(item);
     }
     layoutCurrentInputSource();
     FocusMove.init(false);
 }

 function layoutCurrentInputSource() {
     if (currentInputSource != null) {
         var current = document.querySelector("#inputs .current");
         if (current == null) {
             current = document.createElement("div");
             current.className = "current";
         }
         if (current.parentNode != null) {
             current.parentNode.removeChild(current);
         }
         var input = document.querySelector(`#inputs .item[name='${currentInputSource}']`);
         if (input != null)
             input.appendChild(current);
     }
 }

 function switchInputSource(source) {
     currentInputSource = source;
     layoutCurrentInputSource();
     webui.SetInputSource(source, (args) => {
         if (args.res == 0) {
             mlog.d("Succeed to switch to " + args.inputSource);
             currentInputSource = args.inputSource;
             layoutCurrentInputSource();
             webui.ReturnToInputSource(source, null);
         } else
             mlog.e("Failed to switch to " + args.inputSource + ": " + webui.ErrorStrings[args.res]);
     });

 }

 function layoutNetflix(groups) {
     mlog.d("layoutNetflix " + groups.length);
     let nfxFocus = [];
     const cur_time = Date.parse(new Date()) / 1000;
     let container = document.querySelector("#netflix .content-container");
     container.innerHTML = "";
     for (let i = 0; i < groups.length; i++) {
         let groupTitle = groups[i].title;
         let tiles = groups[i].tiles;

         let groupEle = document.createElement("div");
         groupEle.className = "group";
         let titleEle = document.createElement("div");
         titleEle.className = "groupTitle";
         titleEle.innerHTML = groupTitle;
         groupEle.appendChild(titleEle);
         let contentEle = document.createElement("div");
         contentEle.className = "content";

         for (let j = 0; j < tiles.length; j++) {
             if (tiles[j].expiry != null && tiles[j].expiry < cur_time) {
                 continue;
             }
             let w = nfxHeight * tiles[j].width / tiles[j].height;
             let url = tiles[j].url;
             let title = tiles[j].title;
             let itemEle = document.createElement("div");
             if (j == 0) {
                 titleEle.style.width = w + "px";
             }
             itemEle.className = "block item";
             itemEle.style.width = w + "px";
             itemEle.tabIndex = "-1";
             itemEle.style.backgroundImage = `url('${ url }')`;

             itemEle["fm-click"] = () => {
                 webui.OpenApp("Netflix", tiles[j].deepLink, (args) => {
                     if (args.res == 0)
                         mlog.d(args.appName + " has been opened");
                     else
                         mlog.e("Failed to open " + args.appName + ": " + webui.ErrorStrings[args.res]);
                 });
             };
             nfxFocus.push(itemEle);
             groupEle.appendChild(itemEle);
             container.appendChild(groupEle);
         }

     }
     //process focusmove
     for (var i = 0; i < nfxFocus.length; i++) {
         var left = i == 0 ? -1 : 'nfx_' + (i - 1);
         var right = (i == nfxFocus.length - 1) ? '-1' : 'nfx_' + (i + 1);
         nfxFocus[i].id = "nfx_" + i;
         nfxFocus[i].setAttribute("fm-left", left);
         nfxFocus[i].setAttribute("fm-right", right);
         nfxFocus[i].setAttribute("fm-up", "app_0");
         nfxFocus[i]["fm-up"] = () => {
             switchRow("#apps");
         };
         nfxFocus[i]["fm-down"] = () => {
             switchRow("#inputs");
         }
     }

     FocusMove.init(false);
     const groupTitles = container.getElementsByClassName("groupTitle");
     for (let i = 0; i < groupTitles.length; i++) {
         const item = groupTitles.item(i);
         if (item.nextElementSibling instanceof HTMLElement) {
             item.style.width = getComputedStyle(item.nextElementSibling).width;
         }
     }
 }

 function openNativeUI(command) {
     webui.OpenNativeUI(command, (args) => {
         if (args.res == 0)
             mlog.d("Native UI has been opened");
         else
             mlog.e("Failed to open Native UI: " + webui.ErrorStrings[args.res]);
     });

 }