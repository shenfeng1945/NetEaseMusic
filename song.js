/**
 * Created by lzc on 2017/8/23.
 */

let audio = document.createElement('audio')
audio.src = 'http://ov4sliu3n.bkt.clouddn.com/955d%252F222a%252F3b98%252F1115a4c61c8e7fc1c65a96c8c0efd5db.mp3'
audio.oncanplay = function(){
    audio.play()
}
$('.icon-pause').on('click',function(){
   audio.pause()
    $('.disc-container').removeClass('playing')
})
$('.icon-play').on('click',function(){
    audio.play()
    $('.disc-container').addClass('playing')
})

// $(function(){
//     $.get('/song.json').then(function(object){
//         let {lyric} = object
//         console.log(lyric.split('\n'))
//     })
// })
