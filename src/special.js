export default function speicial(){
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

