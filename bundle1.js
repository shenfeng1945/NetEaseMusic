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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_search__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_load_songs__ = __webpack_require__(3);



Object(__WEBPACK_IMPORTED_MODULE_2__src_load_songs__["a" /* default */])()
Object(__WEBPACK_IMPORTED_MODULE_1__src_search__["a" /* default */])()
Object(__WEBPACK_IMPORTED_MODULE_0__home__["a" /* default */])('.tabs')


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = tabs;
/**
 * Created by lzc on 2017/8/22.
 */
function tabs(selectorOrDom) {
        let $tabs = $(selectorOrDom)
        $tabs.on('click', '.tabs-nav > li', function () {
            let $li = $(this)
            let index = $li.index()
            $li.addClass('active').siblings('.active').removeClass('active')
            // console.log($('.tabsContent > li').eq(index))
            $li.closest('.tabs').find('.tabsContent').children().eq(index).addClass('active').siblings('.active').removeClass('active')
        })
    }



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = doIt;
    //搜索框
    let timer = null
function doIt() {
        $('#output').on('input', function (e) {
            throttle(function () {
                searchValue(e.currentTarget)
            }, 400)
        })
    }
    function throttle(callback, time) {
        //函数节流
        if (timer) { window.clearTimeout(timer) }
        //定时器不能用普通的函数声明，因为this会被指定给timer
        timer = setTimeout(() => {
            timer = null
            callback()
        }, time)
    }
    function template(result) {
        let { name, singer } = result.attributes
        let { id } = result
        return `
            <li class="border-bottom">
                <a href="./song.html?id=${id}">
                    <svg>
                        <use xlink:href="#icon-search"></use>
                    </svg>
                <span>${name} - ${singer}</span>
                </a>
            </li>
          `
    }
    function getSongs(value) {
        var query1 = new AV.Query('Song');
        query1.contains('name', value);
        var query2 = new AV.Query('Song');
        query2.contains('singer', value);
        var query = AV.Query.or(query1, query2)
        return query.find()
    }
    function clearInput() {
        $('.hot-search').removeClass('clear')
        $('.searchAll > h3').empty()
        $('.searchAll  li').empty()
        $('#searchResults').html(null)
        return
    }
    function displaySongs(result) {
        //每次进来之前清空这个没有结果
        $('#searchResults').empty()
        if (result.length === 0) {
            $('#searchResults').html('没有结果')
        }
        else {
            for (var i = 0; i < result.length; i++) {
                let $li = template(result[i])
                $('#searchResults').append($li)
            }
        }
    }
    function searchValue(input) {
        //当内容删完后，让热门搜索现身，并删掉搜索结果
        if (input.value === '') {
            clearInput()
            return
        }
        let value = input.value.trim()
        //无论输入一个什么结果，让"热门搜索"消失
        $('.hot-search').addClass('clear')
        // 把搜索内容为空格时，它会打出所有结果，通过以下判断可以删除所有结果
        if (value === '') { return }
        $('.searchAll > h3').html(`搜索“${value}”`)
        getSongs(value).then(displaySongs)
    }


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = loadSongs;
function loadSongs() {
        let count = 0
        getSongs().then(fillSongs, function (error) {
            alert('获取歌词失败')
        });
        function template1(options) {
            let { id, name, singer, special } = options
            return `
             <li>
                 <a href="./song.html?id=${id}">
                    <div class="music-item">
                       <h2>${name}<span></span></h2>
                       <p>
                          <svg class="icon-sq">
                             <use xlink:href="#icon-sq"></use>
                          </svg>
                          ${singer} - ${special}
                       </p>
                     </div>
                    <div class="play">
                          <svg>
                             <use xlink:href="#icon-play"></use>
                          </svg>
                    </div>
                 </a>
             </li>
             `
        }
        function template2(options) {
            let { id, name, singer, special } = options
            return `
               <li>
                 <a href="./song.html?id=${id}">
                    <div class="music-item">
                       <h2>${name}<span></span></h2>
                       <p>
                          ${singer} - ${special}
                       </p>
                     </div>
                    <div class="play">
                          <svg>
                             <use xlink:href="#icon-play"></use>
                          </svg>
                    </div>
                 </a>
             </li>
            `
        }
        function template3(options) {
            let { id, name, singer, special, count } = options
            return `
                 <li>
                    <a href="./song.html?id=${id}">
                        <div class="order">${count}</div>
                        <div class="item-play-wrap">
                            <div class="hot-item">
                               <h2>${name}</h2>
                               <p>
                                  <i class="active">
                                   <svg>
                                      <use xlink:href="#icon-sq"></use>
                                   </svg>
                                   </i>
                                ${singer} - ${special}
                                </p>
                            </div>
                            <div class="hot-play">
                               <svg>
                                 <use xlink:href="#icon-play"></use>
                               </svg>
                            </div>
                        </div>
                    </a>
                </li>
             `
        }
        function getSongs() {
            var query = new AV.Query('Song');
            return query.find()
        }
        function isNewMusic(options) {
            let { id, name, singer, special, hasSq, newmusic } = options
            //选择最新音乐
            if (newmusic) {
                //判断有没有没svg图标
                if (hasSq) {
                    let $li = template1({ id, name, singer, special })
                    $('.new-lists').append($li)
                } else {
                    let $li = template2({ name, id, singer, special })
                    $('.new-lists').append($li)
                }
            }
        }
        function isHotMusic(options) {
            let { id, name, singer, special, hotsong } = options
            //选择热歌榜
            if (hotsong) {
                count++
                if (count < 10) { count = '0' + count }
                let li = template3({ name, id, singer, special, count })
                $('ol.hot-lists').append(li)
            }
        }
        function isHotSearch(options) {
            let { hotsearch, id, name } = options
            if (hotsearch) {
                let li = `
            <li><a href="./song.html?id=${id}">${name}</a>
             `
                $('.hot-search-lists').append(li)
            }
        }
        function fillSongs(results) {
            $('.new-music > .loading').css('display', 'none')
            for (let i = 0; i < results.length; i++) {
                let id = results[i].id
                let content = results[i].attributes
                let { name, singer, hasSq, newmusic, special, hotsong, hotsearch } = content
                isNewMusic({ newmusic, hasSq, id, name, singer, special })
                isHotMusic({ id, name, singer, special, hotsong })
                isHotSearch({ hotsearch, id, name })
            }
        }
    }


/***/ })
/******/ ]);