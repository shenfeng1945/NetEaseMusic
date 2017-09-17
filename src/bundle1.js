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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(2);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./node_modules/css-loader/index.js!./node_modules/autoprefixer-loader/index.js!./reset.css", function() {
			var newContent = require("!!./node_modules/css-loader/index.js!./node_modules/autoprefixer-loader/index.js!./reset.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}\r\nul,ol{list-style: none;}\r\na{color:inherit;text-decoration: none;}\r\nh1,h2,h3,h4,h5{font-weight: normal;}", ""]);

// exports


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__search__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__load_songs__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_css__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__home_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__reset_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__reset_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__reset_css__);





Object(__WEBPACK_IMPORTED_MODULE_2__load_songs__["a" /* default */])()
Object(__WEBPACK_IMPORTED_MODULE_1__search__["a" /* default */])()
Object(__WEBPACK_IMPORTED_MODULE_0__home__["a" /* default */])('.tabs')


/***/ }),
/* 6 */
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
/* 7 */
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
/* 8 */
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


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(10);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./node_modules/css-loader/index.js!./node_modules/autoprefixer-loader/index.js!./home.css", function() {
			var newContent = require("!!./node_modules/css-loader/index.js!./node_modules/autoprefixer-loader/index.js!./home.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "body{\r\n    font-size:4.6875vw;\r\n    font-family: Helvetica, sans-serif;\r\n    color:#333;\r\n}\r\n.page{\r\n}\r\n/*两个标题公共的部分写在一起*/\r\n.sectionTitle{\r\n    font-size:5.3125vw;\r\n    color:#333;\r\n    line-height:1;\r\n    padding-left:2.1875vw;\r\n    border-left:0.625vw solid #D33A31;\r\n    margin-bottom:5vw;\r\n}\r\n.border-bottom::after{\r\n    content:'';\r\n    display: block;\r\n    position:absolute;\r\n    bottom:0;\r\n    left:0;\r\n    width:200%;\r\n    border-bottom:1px solid rgba(0,0,0,.1);\r\n    -webkit-transform:scale(.5);\r\n            transform:scale(.5);\r\n    -webkit-transform-origin:0 0;\r\n            transform-origin:0 0;\r\n}\r\ninput[type=search] {\r\n    -webkit-appearance: none;\r\n    border: 0;\r\n    border-radius: 0;\r\n    outline: 0;\r\n}\r\n.noCollapse::before{\r\n    content: '';\r\n    display: table;\r\n}\r\n/*top-bar*/\r\n.top-control-wrapper{\r\n    height:32.5vw;\r\n}\r\n.top-bar{\r\n    background:#D43C33;\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    padding:4.6875vw 3.125vw;\r\n    -webkit-box-pack:justify;\r\n        -ms-flex-pack:justify;\r\n            justify-content:space-between;\r\n    -webkit-box-align:center;\r\n        -ms-flex-align:center;\r\n            align-items:center;\r\n    position: fixed;\r\n    width:100%;\r\n    left:0;\r\n    top:0;\r\n    z-index:3;\r\n}\r\n.top-bar > .logo{\r\n    margin: 0.625vw 0;\r\n}\r\n.top-bar > .logo svg{\r\n    width:44.375vw;\r\n    height:9.375vw;\r\n    vertical-align: middle;\r\n}\r\n/*.top-bar > a{*/\r\n    /*display: block;*/\r\n/*}*/\r\n.top-bar > .download{\r\n    color:white;\r\n    position:relative;\r\n    padding:0 3.125vw;\r\n    line-height:9.375vw;\r\n}\r\n.top-bar > .download::after{\r\n    content:'';\r\n    display: block;\r\n    position: absolute;\r\n    top:0;\r\n    left:0;\r\n    width:200%;\r\n    height:200%;\r\n    border:1px solid white;\r\n    border-radius:9.375vw;\r\n    -webkit-transform:scale(0.5);\r\n            transform:scale(0.5);\r\n    -webkit-transform-origin:0 0;\r\n            transform-origin:0 0;\r\n}\r\n\r\n/*tabs-control*/\r\n.tabs-control{\r\n    position: fixed;\r\n    left:0;\r\n    width:100%;\r\n    top:20vw;\r\n    background:white;\r\n    z-index:3;\r\n}\r\n.tabs-control ol{\r\n    position:relative;\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    text-align:center;\r\n}\r\n/*.tabs-control ol::after{*/\r\n    /*content:'';*/\r\n    /*display: block;*/\r\n    /*position:absolute;*/\r\n    /*left:0;*/\r\n    /*bottom:0;*/\r\n    /*width:200%;*/\r\n    /*border-bottom:1px solid rgba(0,0,0,.2);*/\r\n    /*transform: scale(.5);*/\r\n    /*transform-origin: 0 0;*/\r\n/*}*/\r\n.tabs-control ol li{\r\n    width:33.33333%;\r\n    line-height:10.9375vw;\r\n    color:#333;\r\n    padding:0.78125vw 0 0;\r\n}\r\n.tabs-control ol li.active{\r\n   color:#d33a31;\r\n}\r\n.tabs-control ol li div{\r\n    padding:0 1.5625vw;\r\n    display: inline-block;\r\n    /*line-height: 38px;*/\r\n}\r\n.tabs-control ol li.active div{\r\n    border-bottom:2px solid #d33a31;\r\n}\r\n\r\n/*tabs-content1*/\r\n.tabs-content1{\r\n    display: none;\r\n    background:#FCFCFD;\r\n}\r\n.tabs-content1.active{\r\n    display: block;\r\n}\r\n/*推荐歌单*/\r\n.recommend-list{\r\n    padding-top: 6.5625vw;\r\n}\r\n.recommend-list > ol.lists{\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-wrap:wrap;\r\n        flex-wrap:wrap;\r\n    -webkit-box-pack:justify;\r\n        -ms-flex-pack:justify;\r\n            justify-content:space-between;\r\n    /*margin-top:16px;*/\r\n}\r\n.recommend-list > ol.lists li{\r\n    /* min-width:calc(33.3333% - 2px); */\r\n    margin-bottom: 5vw;\r\n    position:relative;\r\n    width:32.8%;\r\n}\r\n.recommend-list > ol.lists li img{\r\n    width: 32.65625vw;\r\n    height:32.65625vw;\r\n    vertical-align:middle;\r\n\r\n}\r\n.recommend-list > ol.lists li p{\r\n    display: -webkit-box;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-line-clamp: 2;\r\n    overflow: hidden;\r\n    font-size: 4.0625vw;\r\n    padding:1.875vw 0.625vw 0 1.875vw;\r\n    line-height:1.2;\r\n}\r\n.recommend-list > ol.lists li span{\r\n    position:absolute;\r\n    right: 1.5625vw;\r\n    top: 0.625vw;\r\n    color:white;\r\n    font-size:3.75vw;\r\n}\r\n.recommend-list > ol.lists li span i{\r\n}\r\n.recommend-list > ol.lists li span i svg{\r\n   width:3.4375vw;\r\n    height: 3.125vw;\r\n}\r\n/*最新音乐*/\r\n.new-music{\r\n    margin-top: 7.5vw;\r\n}\r\n.new-music .loading{\r\n    text-align:center;\r\n}\r\n.new-music .loading img{\r\n    width: 6.25vw;\r\n    height:auto;\r\n}\r\n.new-music ul.new-lists{}\r\n.new-music ul.new-lists li{\r\n    padding-left: 3.125vw;\r\n}\r\n.new-music ul.new-lists li a{\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-pack: justify;\r\n        -ms-flex-pack: justify;\r\n            justify-content: space-between;\r\n    position:relative;\r\n}\r\n.new-music ul.new-lists li .music-item{\r\n   padding:1.875vw 0;\r\n}\r\n.new-music ul.new-lists a::after{\r\n    content:'';\r\n    display: block;\r\n    position:absolute;\r\n    bottom:0;\r\n    left:0;\r\n    -webkit-transform:scale(.5);\r\n            transform:scale(.5);\r\n    width:200%;\r\n    /*height:200%;*/\r\n    -webkit-transform-origin: 0 0;\r\n            transform-origin: 0 0;\r\n    border-bottom:1px solid rgba(0,0,0,.2);\r\n}\r\n\r\n.new-music ul.new-lists li .music-item{\r\n    width: 83.75vw;\r\n}\r\n.new-music ul.new-lists li h2{\r\n    font-size: 5.3125vw;\r\n    overflow: hidden;\r\n    text-overflow:ellipsis;\r\n    white-space: nowrap;\r\n    padding:0.3125vw 0;\r\n}\r\n.new-music ul.new-lists li h2 span{\r\n    color:#888;\r\n    margin-left: 1.25vw;\r\n}\r\n.new-music ul.new-lists li p{\r\n    font-size: 3.75vw;\r\n    color:#888;\r\n    overflow: hidden;\r\n    text-overflow:ellipsis;\r\n    white-space: nowrap;\r\n    padding:0.3125vw 0;\r\n}\r\n.new-music ul.new-lists li p i{\r\n    width: 3.75vw;\r\n    height: 2.5vw;\r\n    margin-right:-0.625vw;\r\n    vertical-align: middle;\r\n    margin-left:-0.9375vw;\r\n}\r\n.icon-sq{\r\n    width:1em;\r\n    height:1em;\r\n    fill:#FE672E;\r\n    vertical-align:middle;\r\n    overflow:hidden;\r\n}\r\n.new-music ul.new-lists li .play {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-pack: center;\r\n        -ms-flex-pack: center;\r\n            justify-content: center;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\r\n}\r\n.new-music ul.new-lists li .play svg{\r\n   width:6.875vw;\r\n    height: 6.875vw;\r\n    margin-right: 3.125vw;\r\n    vertical-align: middle;\r\n}\r\n/*footer*/\r\n.footer{\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-orient:vertical;\r\n    -webkit-box-direction:normal;\r\n        -ms-flex-direction:column;\r\n            flex-direction:column;\r\n    -webkit-box-align:center;\r\n        -ms-flex-align:center;\r\n            align-items:center;\r\n    background:url('http://s3.music.126.net/m/s/img/recommand_bg_2x.png?d045fafc60e017b653f8065a87496922') no-repeat center;\r\n    background-size:cover;\r\n}\r\n.footer .bottom-logo{\r\n    margin-top:13.4375vw;\r\n    width: 71.875vw;\r\n}\r\n.footer .button{\r\n    border:1px solid #d33a31;\r\n    color:#d33a31;\r\n    font-size: 5vw;\r\n    padding: 2.8125vw 6.5625vw;\r\n    border-radius: 6.25vw;\r\n    margin-top: 4.375vw;\r\n}\r\n.footer p.copyright{\r\n    font-size: 3.75vw;\r\n    -webkit-transform:scale(.75);\r\n            transform:scale(.75);\r\n    color:#888;\r\n}\r\n\r\n\r\n/*....................第二个页面..................*/\r\n.tabs-content2{\r\n    display: none;\r\n}\r\n.tabs-content2.active{\r\n    display: block;\r\n\r\n}\r\n/*热歌榜*/\r\n.tabs-content2 .hot-banner.noCollapse{\r\n   background: transparent url('http://s3.music.126.net/m/s/img/hot_music_bg_2x.jpg?f01a252389c26bcf016816242eaa6aee') no-repeat center;\r\n    padding-left: 6.25vw;\r\n    /*padding-top:.1px;*/\r\n    padding-bottom: 5vw;\r\n    position:relative;\r\n}\r\n.tabs-content2 .hot-banner::after{\r\n    content:'';\r\n    display: block;\r\n    position:absolute;\r\n    left:0;\r\n    top:0;\r\n    width:100%;\r\n    height:100%;\r\n    background:rgba(0,0,0,.2);\r\n    z-index:0;\r\n}\r\n\r\n.tabs-content2 .hot-banner .hot-notice{\r\n   background: url('https://i.loli.net/2017/08/22/599c513e4c3f0.png') no-repeat -7.5vw -9.375vw;\r\n    width: 44.375vw;\r\n    height: 20.9375vw;\r\n    background-size: 51.875vw 30.3125vw;\r\n    margin-top: 4.6875vw;\r\n    position: relative;\r\n    z-index:1;\r\n}\r\n.tabs-content2 .hot-banner .date{\r\n   font-size: 3.75vw;\r\n    margin-top: 3.125vw;\r\n    color: rgba(255,255,255,.8);\r\n    -webkit-transform:scale(.91);\r\n            transform:scale(.91);\r\n    -webkit-transform-origin: 0 0;\r\n            transform-origin: 0 0;\r\n    position: relative;\r\n    z-index:1;\r\n}\r\n/*热歌列表*/\r\n.tabs-content2 .hot-lists{\r\n    background:#fcfcfd;\r\n}\r\n.tabs-content2 .hot-lists li a{\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-pack:justify;\r\n        -ms-flex-pack:justify;\r\n            justify-content:space-between;\r\n    padding-left: 3.125vw;\r\n    -webkit-box-align:center;\r\n        -ms-flex-align:center;\r\n            align-items:center;\r\n}\r\n.tabs-content2 .hot-lists li .item-play-wrap{\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-pack:justify;\r\n        -ms-flex-pack:justify;\r\n            justify-content:space-between;\r\n    -webkit-box-align:center;\r\n        -ms-flex-align:center;\r\n            align-items:center;\r\n    position:relative;\r\n    -webkit-box-flex:1;\r\n        -ms-flex-positive:1;\r\n            flex-grow:1;\r\n}\r\n.tabs-content2 .hot-lists li .item-play-wrap::after{\r\n   content:'';\r\n    display: block;\r\n    position:absolute;\r\n    bottom:0;\r\n    left:0;\r\n    /*height:200%;*/\r\n    width:200%;\r\n    border-bottom:1px solid rgba(0,0,0,.1);\r\n    -webkit-transform: scale(.5);\r\n            transform: scale(.5);\r\n    -webkit-transform-origin:0 0;\r\n            transform-origin:0 0;\r\n}\r\n.tabs-content2 .hot-lists .order{\r\n    font-size: 5.3125vw;\r\n    width: 8.75vw;\r\n    margin-top: 0.3125vw;\r\n    color:#999;\r\n}\r\n.tabs-content2 .hot-lists li:first-child .order{\r\n    color:#d33a31;\r\n}\r\n.tabs-content2 .hot-lists li:nth-child(2) .order{\r\n    color:#d33a31;\r\n}\r\n.tabs-content2 .hot-lists li:nth-child(3) .order{\r\n    color:#d33a31;\r\n}\r\n.tabs-content2 .hot-lists .hot-item{\r\n    width: 75vw;\r\n    padding:1.71875vw 0;\r\n}\r\n.tabs-content2 .hot-lists .hot-item h2{\r\n    overflow: hidden;\r\n    text-overflow:ellipsis;\r\n    white-space: nowrap;\r\n    font-size: 5.3125vw;\r\n    padding:0.3125vw 0;\r\n    /*line-height:25px;*/\r\n}\r\n.tabs-content2 .hot-lists .hot-item h2 span{\r\n    color:#888;\r\n}\r\n.tabs-content2 .hot-lists .hot-item p{\r\n    font-size: 3.75vw;\r\n    color:#888;\r\n    padding: 0.3125vw 0;\r\n    overflow: hidden;\r\n    text-overflow:ellipsis;\r\n    white-space: nowrap;\r\n}\r\n.tabs-content2 .hot-lists .hot-item p i{\r\n    width: 3.75vw;\r\n    height: 2.5vw;\r\n    margin-right:-0.625vw;\r\n    vertical-align: middle;\r\n    margin-left:-0.9375vw;\r\n    display: none;\r\n}\r\n.tabs-content2 .hot-lists .hot-item p i.active{\r\n    display: inline;\r\n}\r\n.tabs-content2 .hot-lists .hot-item p i svg{\r\n    display: none;\r\n}\r\n.tabs-content2 .hot-lists .hot-item p i.active svg{\r\n    display: inline;\r\n    width: 5.625vw;\r\n    height: 3.75vw;\r\n    vertical-align:bottom;\r\n}\r\n.tabs-content2 .hot-lists .hot-play{\r\n    padding:0 3.125vw;\r\n}\r\n.tabs-content2 .hot-lists .hot-play svg{\r\n    width: 6.875vw;\r\n    height: 6.875vw;\r\n}\r\n.tabs-content2 .whole-list{\r\n    color:#999;\r\n    font-size: 4.375vw;\r\n    text-align: center;\r\n    background:#fcfcfd;\r\n}\r\n.tabs-content2 .whole-list > a{\r\n    display: block;\r\n}\r\n.tabs-content2 .whole-list span{\r\n    display: inline-block;\r\n   line-height: 17.1875vw;\r\n    padding-right: 0.9375vw;\r\n}\r\n.tabs-content2 .whole-list i svg{\r\n   width: 2.1875vw;\r\n    height: 3.75vw;\r\n    vertical-align: middle;\r\n}\r\n\r\n/*.....................第三个页面.....................*/\r\n.tabs-content3{\r\n    display: none;\r\n    /*background:#FBFCFD;*/\r\n    /*height:100vh;*/\r\n}\r\n.tabs-content3.active{\r\n    display: block;\r\n}\r\n.tabs-content3 .search-wrap{\r\n    padding: 4.6875vw 3.125vw;\r\n    position:relative;\r\n}\r\n.tabs-content3 .search{\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-pack:center;\r\n        -ms-flex-pack:center;\r\n            justify-content:center;\r\n    -webkit-box-align:center;\r\n        -ms-flex-align:center;\r\n            align-items:center;\r\n    border-radius: 9.375vw;\r\n    background:#EBECEC;\r\n}\r\n.tabs-content3 .search i{\r\n    display: block;\r\n    width: 4.0625vw;\r\n    height: 4.0625vw;\r\n    background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxLDIzLjUzNWwtMS40MTQsMS40MTRsLTcuMzE1LTcuMzE0CgkJQzE0LjcwOSwxOS4xMDcsMTIuNDYsMjAsMTAsMjBDNC40NzcsMjAsMCwxNS41MjMsMCwxMEMwLDQuNDc3LDQuNDc3LDAsMTAsMGM1LjUyMywwLDEwLDQuNDc3LDEwLDEwYzAsMi4zNDItMC44MTEsNC40OS0yLjE2LDYuMTk1CgkJTDI1LjE4MSwyMy41MzV6IE0xMCwyYy00LjQxOCwwLTgsMy41ODItOCw4czMuNTgyLDgsOCw4YzQuNDE4LDAsOC0zLjU4Miw4LThTMTQuNDE4LDIsMTAsMnoiLz48L3N2Zz4=');\r\n    margin:0 2.5vw;\r\n    vertical-align:middle;\r\n}\r\n.tabs-content3 .search #output{\r\n    /*除去默认的border*/\r\n    /*border: 1px solid #ebebeb;*/\r\n    font-size: 4.375vw;\r\n    background:#EBECEC;\r\n    color:#333;\r\n    line-height: 8.125vw;\r\n    -webkit-box-flex:1;\r\n        -ms-flex-positive:1;\r\n            flex-grow:1;\r\n    /*除去默认的outline*/\r\n    /*outline:none;*/\r\n    /*border:none;*/\r\n}\r\n/*重写占位符的样式*/\r\n.tabs-content3 .search #output::-webkit-input-placeholder{\r\n    color:#c9c9c9;\r\n}\r\n/*.tabs-content3 .search #output::-webkit-search-cancel-button{*/\r\n    /*-webkit-appearance: none;*/\r\n    /*background:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOCAyOCI+PGcgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjYmNiZGJkIiBkPSJNMTQsMGM3LjczMiwwLDE0LDYuMjY4LDE0LDE0YzAsNy43MzItNi4yNjgsMTQtMTQsMTQKCVMwLDIxLjczMiwwLDE0QzAsNi4yNjgsNi4yNjgsMCwxNCwweiIvPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ViZWNlYiIgc3Ryb2tlLXdpZHRoPSIyLjUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCI+PHBhdGggZD0ibTE5IDlsLTEwIDEwIi8+PHBhdGggZD0ibTkgOWwxMCAxMCIvPjwvZz48L2c+PC9zdmc+');*/\r\n/*}*/\r\n.tabs-content3 .search .half-circle{\r\n    width: 9.375vw;\r\n    height: 9.375vw;\r\n}\r\n.tabs-content3 .hot-search{\r\n    padding: 3.75vw 3.125vw 0;\r\n    display: block;\r\n}\r\n.tabs-content3 .hot-search.clear{\r\n    display: none;\r\n}\r\n.tabs-content3 .hot-search > h3{\r\n    font-size: 3.75vw;\r\n    margin-bottom: 2.8125vw;\r\n}\r\n.tabs-content3 .hot-search ul.hot-search-lists{\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-wrap:wrap;\r\n        flex-wrap:wrap;\r\n}\r\n.tabs-content3 .hot-search ul.hot-search-lists li{\r\n    font-size: 4.375vw;\r\n    position:relative;\r\n    margin-right: 2.5vw;\r\n    margin-bottom: 2.5vw;\r\n    /*padding: 5px 14px;*/\r\n    line-height: 6.875vw;\r\n    border:1px solid rgba(0,0,0,.2);\r\n    border-radius: 10.625vw;\r\n}\r\n.tabs-content3 .hot-search ul.hot-search-lists li >a{\r\n    display: block;\r\n    padding: 1.5625vw 4.375vw;\r\n}\r\n.tabs-content3 .searchAll h3{\r\n    position:relative;\r\n   font-size: 4.6875vw;\r\n    color:#507DAF;\r\n    line-height: 15.625vw;\r\n}\r\n\r\n.tabs-content3 .hot-search #searchResults.hidden{\r\n    display:none;\r\n}\r\n.tabs-content3 .hot-search #searchResults{\r\n    display: block;\r\n}\r\n.tabs-content3 .searchAll{\r\n    display: block;\r\n    padding-left: 3.125vw;\r\n}\r\n.tabs-content3 .searchAll.hidden{\r\n    display: none;\r\n}\r\n.tabs-content3  #searchResults li{\r\n    position: relative;\r\n    line-height: 14.0625vw;\r\n}\r\n.tabs-content3  #searchResults li > a{\r\n    display: block; \r\n}\r\n.tabs-content3 #searchResults li svg{\r\n    width: 5.625vw;\r\n    height: 5.625vw;\r\n    fill:#B1B1B1;\r\n    vertical-align:middle;\r\n}\r\n", ""]);

// exports


/***/ })
/******/ ]);