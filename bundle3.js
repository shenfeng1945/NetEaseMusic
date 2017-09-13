/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ({

/***/ 6:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__special__ = __webpack_require__(7);

Object(__WEBPACK_IMPORTED_MODULE_0__special__["a" /* default */])()

/***/ }),

/***/ 7:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = speicial;
function speicial(){
var query = new AV.Query('Song');
let url = window.location.href
let reg = /.*\=(.*)/
let number = url.match(reg)['1']
let count = 0
//默认全局隐藏，现loading
// $('.page').addClass('hidden')
query.find().then(function (results) {
    for(var i=0;i<results.length;i++){
        let array = results[i].attributes
        let id = results[i].id
        let {name,singer,special} = array
        if(array.number === number){
            if(array.fullname){
                getMessage({
                    fullname: array.fullname,
                    head: array.head,
                    summary: array.summary
                })
            }else{
                count ++
                let li = `
           <li>
                <a href="./song.html?id=${id}">
                    <div class="number">${count}</div>
                    <div class="list-play-wrap">
                        <div class="list-item">
                            <h3>${name}</h3>
                            <p>${singer} - ${special}</p>
                        </div>
                        <div class="play">
                            <svg>
                                <use xlink:href="#icon-play"></use>
                            </svg>
                        </div>
                    </div>
                </a>
            </li> 
                      `
                $('.hot-songs > ul').append(li)
                $('.hot-songs> h3').text(`热门单曲${count}首`)
            }
        }
    }
    $('.page').removeClass('hidden')
    $('.loading').remove()
})
    function getMessage(options){
        let {fullname,head,summary} = options
        let $img = document.querySelector('.art-head > img')
        $img.src = head
        $('.art-head > .name').text(fullname)
        $('.summary > p').text(summary)
        $('head title').text(`${fullname}- 网易云音乐`)
    }
}



/***/ })

/******/ });