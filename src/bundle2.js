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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ 4:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__song__ = __webpack_require__(5);

Object(__WEBPACK_IMPORTED_MODULE_0__song__["a" /* default */])()

/***/ }),

/***/ 5:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = song;
/**
 * Created by lzc on 2017/8/23.
 */
function song(){

var query = new AV.Query('Song');
let audio = document.createElement('audio')
//让音频内联播放 ios10
audio.playsinline = true
$('.icon-pause').on('click', function () {
    audio.pause()
    $('.disc-container').addClass('pause')
})
$('.icon-play').on('click', function () {
    audio.play()
    $('.disc-container').removeClass('pause')
})

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
$(function(){
    let url = window.location.href
    let reg = /.*\=(.*)/
    let id = url.match(reg)[1]
    query.find().then(function(object){
        for(var i=0;i<object.length;i++){
            let array = object[i].attributes
            if(object[i]['id'] === id){
                getMusic({
                    name: array['name'],
                    lyric: array['lyric'],
                    singer: array['singer'],
                    song: array['song'],
                    img: array['img'],
                    background: array['background']
                })
            }
        }
    })
    function getMusic(options){
        let {name,lyric,singer,song,img,background} = options
        let image = document.querySelector('.center-image')
        image.src = img
        let $page = $('.page')
        $page.css('background-image',`url(${background})`)
        let h1 = `
             <h1 class="lyric-head">${name} <span>- ${singer}</span></h1>
           `
        $('.lyrics').prepend(h1)
        $('head title').text(`${name}-${singer}-在线试听-网易云音乐`)
        // $('.lyric-head').text(name),这样不行，会覆盖h1下的标签。
        // console.log(singer)
        // $('.singer').text(singer)
        audio.src = song
        let array = lyric.split('\n')
        let reg = /\[(.*)\](.+)/
        let arr = []
        let $lyric = $('.lyric-moving')
        array = array.map((string) => {
            let obj = {}
            obj = string.match(reg)
            return obj
        })
        for(var i=0;i<array.length;i++){
            if(array[i]){
                let $p = `
                   <p data-time="${array[i][1]}">${array[i][2]}</p>
                     `
                $lyric.append($p)
      }

}
     }

})

setInterval(function(){
     let time = audio.currentTime
     let minute = ~~(time/60)
     let newminute = (minute>9)?minute:'0'+minute
     let second = time - minute*60
    //为什么second>9不行？
     let newSecond = (second > 10)?second:`0`+second
    // console.log(newSecond)
     let newTime = `${newminute}:${newSecond}`
     let $p = $('.lyric-moving>p')
    // console.log(time)
    $.each($p,function(item){
        let pTime = $p.eq(item).attr('data-time')
        let pNextTime = $p.eq(item+1).attr('data-time')
        //有的歌第一句起始时间较大，在未到这个时间时，它不会变色
        if(newTime < pTime && item === 0){
            $p.eq(0).css('color','white')
        }
        if(newTime >= pTime && newTime < pNextTime){
            let movingPx = `-${(item-1)*24}px`
            $('.lyric-moving').css('transform',`translateY(${movingPx})`)
            $p.eq(item).css('color','white')
            $p.eq(item-1).css('color','rgba(255,255,255,.6)')
        }else if($p.length -1 === item && newTime >=pTime){
            $p.eq(item).css('color','white')
            $p.eq(item-1).css('color','rgba(255,255,255,.6)')
        }
    })
},300)
//播放结束后一切还原,但旋转的图片没还原只是暂停
audio.addEventListener('ended',function(){
    $('.lyric-moving').css('transform','translateY(0px)')
    $('.icon-pause').click()
})

}



/***/ })

/******/ });