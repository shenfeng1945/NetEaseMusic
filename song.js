/**
 * Created by lzc on 2017/8/23.
 */

let audio = document.createElement('audio')
audio.src = "http://ov4sliu3n.bkt.clouddn.com/%E6%88%91%E7%9A%84%E4%B8%80%E4%B8%AA%E9%81%93%E5%A7%91%E6%9C%8B%E5%8F%8B.mp3"
audio.oncanplay = function () {
    audio.play()
}
$('.icon-pause').on('click', function () {
    audio.pause()
    $('.disc-container').removeClass('playing')
})
$('.icon-play').on('click', function () {
    audio.play()
    $('.disc-container').addClass('playing')
})

$(function () {
    $.get('/song.json').then(function (object) {
        let { lyric } = object
        let array = lyric.split('\n')
        let reg = /\[(.+)\](.*)/
        let arr = []
        let $lyric = $('.lyric-moving')
        for (let i = 0; i < array.length; i++) {
            if (array[i]) {
                arr.push(array[i].match(reg))
            }
            if(arr[i][2]){
            var $p = $('<p>')
            $p.attr('date-time', arr[i][1]).text(arr[i][2])
            $p.appendTo($lyric)
            }
        console.log(arr)
        }
    })
})
