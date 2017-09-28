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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
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
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__song__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__song_css__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__song_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__song_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reset_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reset_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__reset_css__);



Object(__WEBPACK_IMPORTED_MODULE_0__song__["a" /* default */])();

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = song;
function song() {
    var query = new AV.Query('Song');
    let audio = document.createElement('audio');
    //让音频内联播放 ios10
    audio.playsinline = true;
    $('.icon-pause').on('click', function () {
        audio.pause();
        $('.disc-container').addClass('pause');
    });
    $('.icon-play').on('click', function () {
        audio.play();
        $('.disc-container').removeClass('pause');
    });

    // $(function () {
    //     $.get('/song.json').then(function (object) {
    //         let { lyric } = object
    //         let array = lyric.split('\n')
    //         let reg = /\[(.+)\](.*)/
    //         let arr = []
    //         let $lyric = $('.lyric-moving')
    //         for (let i = 0; i < array.length; i++) {
    //             if (array[i]) {
    //                 arr.push(array[i].match(reg))
    //             }
    //             if(arr[i][2]){
    //             var $p = $('<p>')
    //             $p.attr('date-time', arr[i][1]).text(arr[i][2])
    //             $p.appendTo($lyric)
    //             }
    //         console.log(arr)
    //         }
    //     })
    // })
    $(function () {
        let url = window.location.href;
        let reg = /.*\=(.*)/;
        let id = url.match(reg)[1];
        query.find().then(function (object) {
            for (var i = 0; i < object.length; i++) {
                let array = object[i].attributes;
                if (object[i]['id'] === id) {
                    getMusic({
                        name: array['name'],
                        lyric: array['lyric'],
                        singer: array['singer'],
                        song: array['song'],
                        img: array['img'],
                        background: array['background']
                    });
                }
            }
        });
        function getMusic(options) {
            let { name, lyric, singer, song, img, background } = options;
            let image = document.querySelector('.center-image');
            image.src = img;
            let $page = $('.page');
            $page.css('background-image', `url(${background})`);
            let h1 = `
             <h1 class="lyric-head">${name} <span>- ${singer}</span></h1>
           `;
            $('.lyrics').prepend(h1);
            $('head title').text(`${name}-${singer}-在线试听-网易云音乐`);
            // $('.lyric-head').text(name),这样不行，会覆盖h1下的标签。
            // console.log(singer)
            // $('.singer').text(singer)
            audio.src = song;
            let array = lyric.split('\n');
            let reg = /\[(.*)\](.+)/;
            let $lyric = $('.lyric-moving');
            array = array.map(string => {
                let obj = {};
                obj = string.match(reg);
                return obj;
            });
            for (var i = 0; i < array.length; i++) {
                if (array[i]) {
                    let $p = `
                   <p data-time="${array[i][1]}">${array[i][2]}</p>
                     `;
                    $lyric.append($p);
                }
            }
        }
    });

    setInterval(function () {
        let time = audio.currentTime;
        let minute = ~~(time / 60);
        let newminute = minute > 9 ? minute : '0' + minute;
        let second = time - minute * 60;
        //为什么second>9不行？
        let newSecond = second > 10 ? second : `0` + second;
        // console.log(newSecond)
        let newTime = `${newminute}:${newSecond}`;
        let $p = $('.lyric-moving>p');
        // console.log(time)
        $.each($p, function (item) {
            let pTime = $p.eq(item).attr('data-time');
            let pNextTime = $p.eq(item + 1).attr('data-time');
            //有的歌第一句起始时间较大，在未到这个时间时，它不会变色
            if (newTime < pTime && item === 0) {
                $p.eq(0).css('color', 'white');
            }
            if (newTime >= pTime && newTime < pNextTime) {
                let movingPx = `-${(item - 1) * 24}px`;
                $('.lyric-moving').css('transform', `translateY(${movingPx})`);
                $p.eq(item).css('color', 'white');
                $p.eq(item - 1).css('color', 'rgba(255,255,255,.6)');
            } else if ($p.length - 1 === item && newTime >= pTime) {
                $p.eq(item).css('color', 'white');
                $p.eq(item - 1).css('color', 'rgba(255,255,255,.6)');
            }
        });
    }, 300);
    //播放结束后一切还原,但旋转的图片没还原只是暂停
    audio.addEventListener('ended', function () {
        $('.lyric-moving').css('transform', 'translateY(0px)');
        $('.icon-pause').click();
    });
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(15);
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
		module.hot.accept("!!./node_modules/css-loader/index.js!./node_modules/autoprefixer-loader/index.js!./song.css", function() {
			var newContent = require("!!./node_modules/css-loader/index.js!./node_modules/autoprefixer-loader/index.js!./song.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "body{\r\n    font-family: Helvetica, sans-serif;\r\n}\r\n.page{\r\n    /*background:transparent url('http://p3.music.126.net/nfAuKY8Gx5V3kFhzlc9c5w==/17756013277324793.jpg') no-repeat;*/\r\n    background-size:cover;\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-orient:vertical;\r\n    -webkit-box-direction:normal;\r\n        -ms-flex-direction:column;\r\n            flex-direction:column;\r\n    min-height:100vh;\r\n    position: relative;\r\n    /*padding-bottom:40.625vw;*/\r\n}\r\n.center{\r\n    position: absolute;\r\n    top:50%;\r\n    left: 50%;\r\n    -webkit-transform:translate(-50%,-50%);\r\n            transform:translate(-50%,-50%);\r\n}\r\n.othercenter{\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-pack:center;\r\n        -ms-flex-pack:center;\r\n            justify-content:center;\r\n    -webkit-box-align:center;\r\n        -ms-flex-align:center;\r\n            align-items:center;\r\n}\r\n.page::after{\r\n    content:'';\r\n    display: block;\r\n    position:absolute;\r\n    left:0;\r\n    top:0;\r\n    width:100%;\r\n    height:100%;\r\n    background: rgba(0,0,0,.5);\r\n    z-index:0;\r\n}\r\n.disc-container{\r\n    position:relative;\r\n    z-index:1;\r\n}\r\n.disc-container .pointer{\r\n    position:absolute;\r\n    top:0;\r\n    left:44.8%;\r\n    z-index:1;\r\n\r\n}\r\n.disc-container .pointer img{\r\n   /*width: 26.25vw;*/\r\n   /*height: 35vw;*/\r\n   width: 23.625vw;\r\n   height: 31.5vw;\r\n}\r\n.disc-container .disc{\r\n    position:relative;\r\n    /* display: flex;\r\n    justify-content:center;\r\n    flex-direction: column;\r\n    align-items:center; */\r\n    /*margin-top: 19.6875vw;*/\r\n    margin-top: 16vw;\r\n    /*height: 77.5vw;*/\r\n    height: 69.75vw;\r\n}\r\n.disc-container .disc .icon-wrap{\r\n    /* position:absolute; */\r\n    z-index:1;\r\n    /*width: 15.625vw;*/\r\n    /*height: 15.625vw;*/\r\n    width: 14.0625vw;\r\n    height: 14.0625vw;\r\n    border:1px solid white;\r\n    border-radius:50%;\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-pack:center;\r\n        -ms-flex-pack:center;\r\n            justify-content:center;\r\n    -webkit-box-align:center;\r\n        -ms-flex-align:center;\r\n            align-items:center;\r\n    background:rgba(0,0,0,.4);\r\n}\r\n.disc-container .disc .icon-play{\r\n    display: none;\r\n}\r\n.disc-container .disc .icon-pause{\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n}\r\n.disc-container.pause .disc .icon-play{\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n}\r\n.disc-container.pause .disc .icon-pause{\r\n    display: none;\r\n}\r\n.disc-container .pointer{\r\n    -webkit-transform-origin: 0 0;\r\n            transform-origin: 0 0;\r\n    -webkit-transform:rotateZ(0deg);\r\n            transform:rotateZ(0deg);\r\n    transition: -webkit-transform .5s ease;\r\n    transition: transform .5s ease;\r\n    transition: transform .5s ease, -webkit-transform .5s ease;\r\n}\r\n.disc-container.pause .pointer{\r\n   -webkit-transform: rotateZ(-20deg) ;\r\n           transform: rotateZ(-20deg) ;\r\n}\r\n.disc-container .disc .icon{\r\n    /*position: absolute;*/\r\n    fill:white;\r\n    /*width: 5.625vw;*/\r\n    /*height: 5.625vw;*/\r\n    width: 5vw;\r\n    height: 5vw;\r\n\r\n    /*z-index:2;*/\r\n}\r\n.disc-container .disc .ring{\r\n    display: block;\r\n    /*width: 77.5vw;*/\r\n    width: 69.75vw;\r\n    margin:0 auto;\r\n}\r\n.disc-container .disc .light{\r\n    /* position:absolute; */\r\n    /*width: 77.5vw;*/\r\n    width: 69.75vw;\r\n    -webkit-animation: circling 20s linear infinite;\r\n            animation: circling 20s linear infinite;\r\n    -webkit-animation-play-state: running;\r\n            animation-play-state: running;\r\n}\r\n.disc-container.pause .disc .light{\r\n    -webkit-animation-play-state: paused;\r\n            animation-play-state: paused;\r\n}\r\n.disc-container .disc .center-image{\r\n    /*width: 46.875vw;*/\r\n    width: 42.1875vw;\r\n    border-radius:50%;\r\n    -webkit-animation: circling 20s linear infinite;\r\n            animation: circling 20s linear infinite;\r\n    -webkit-animation-play-state: running;\r\n            animation-play-state: running;\r\n    z-index:2;\r\n    /*height: 46.875vw;*/\r\n    height: 42.1875vw;\r\n}\r\n.disc-container.pause .disc .center-image{\r\n    -webkit-animation-play-state: paused;\r\n            animation-play-state: paused;\r\n}\r\n\r\n.lyrics{\r\n    text-align:center;\r\n    padding:0 10.9375vw;\r\n    /*margin-top: 6.875vw;*/\r\n    margin-top: 5vw;\r\n    z-index:1;\r\n}\r\n.lyrics .lyric-head{\r\n    font-size: 4.6875vw;\r\n    color:#fefefe;\r\n    overflow: hidden;\r\n    text-overflow:ellipsis;\r\n    white-space: nowrap;\r\n}\r\n.lyrics .lyric-head > span{\r\n    color: hsla(0,0%,100%,.6);\r\n    font-size: 4.0625vw;\r\n}\r\n.lyrics .lyric-content{\r\n   margin-top: 4.0625vw;\r\n    height: 22.5vw;\r\n    overflow:hidden;\r\n}\r\n.lyrics .lyric-content .lyric-moving{\r\n    transition: -webkit-transform .3s linear;\r\n    transition: transform .3s linear;\r\n    transition:transform .3s linear, -webkit-transform .3s linear;\r\n}\r\n.lyrics .lyric-content p{\r\n    font-size: 4.0625vw;\r\n    color:rgba(255,255,255,.6);\r\n    line-height: 5.9375vw;\r\n    padding-bottom: 1.5625vw;\r\n    overflow: hidden;\r\n    text-overflow:ellipsis;\r\n    white-space: nowrap;\r\n}\r\n.lyrics .lyric-content p.lyric-now{\r\n    color:white;\r\n}\r\n\r\n.links{\r\n    /*display: flex;*/\r\n    /*justify-content: center;*/\r\n    position:absolute;\r\n    left:50%;\r\n    bottom: 6.25vw;\r\n    -webkit-transform:translateX(-50%);\r\n            transform:translateX(-50%);\r\n    width:100%;\r\n    z-index:1;\r\n}\r\n.links > .wrapper{\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-pack: center;\r\n        -ms-flex-pack: center;\r\n            justify-content: center;\r\n}\r\n.links .open{\r\n    color:#d43b32;\r\n    font-size: 4.6875vw;\r\n    border:1px solid #d43b32;\r\n    padding:2.1875vw 13.125vw;\r\n    border-radius: 1.25vw;\r\n}\r\n.links .download{\r\n    font-size: 4.6875vw;\r\n   background:#d43b32;\r\n    color:white;\r\n    padding:2.1875vw 13.125vw;\r\n    border-radius: 1.25vw;\r\n    margin-left: 3.75vw;\r\n}\r\n\r\n\r\n@keyframes circling{\r\n    0%{\r\n        -webkit-transform: rotate(0deg);\r\n        transform: rotateZ(0deg)\r\n    }\r\n    100%{\r\n        -webkit-transform: rotate(360deg);\r\n        transform: rotateZ(360deg)\r\n    }\r\n}\r\n@-webkit-keyframes circling {\r\n    0% {\r\n        -webkit-transform: rotate(0deg);\r\n        transform: rotate(0deg)\r\n    }\r\n    100% {\r\n        -webkit-transform: rotate(360deg);\r\n        transform: rotate(360deg)\r\n    }\r\n}\r\n", ""]);

// exports


/***/ })
/******/ ]);