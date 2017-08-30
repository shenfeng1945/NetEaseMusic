/**
 * Created by lzc on 2017/8/22.
 */
$('ol.tabs').on('click','li',function(){
    let $li = $(this)
    let index = $li.index()
    $li.addClass('active').siblings('.active').removeClass('active')
    // console.log($('.tabsContent > li').eq(index))
    $('ol.tabsContent > li').eq(index).addClass('active').siblings('.active').removeClass('active')
})

var query = new AV.Query('Song');
query.find().then(function (results) {
    let count = 0
    $('.new-music > .loading').css('display','none')
    for(let i=0;i<results.length;i++){
        let id = results[i].id
        // console.log(id)
        let content = results[i].attributes
        let {name,singer,hasSq,newmusic,special,hotsong,hotsearch} = content
        //选择最新音乐
        if(newmusic){
             //判断有没有没svg图标
          if(hasSq){
            let $li = `
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
             $('.new-lists').append($li)
          }else{
             let $li = `
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
             $('.new-lists').append($li)
           }
        }
        //选择热歌榜
        if(hotsong){
            count ++
            if(count < 10){count= ''+ count}
            let li = `
                 <li>
                     <a href="./song.html?id=${id}">
                          <div class="order">${count}</div>
                          <div class="item-play-wrap">
                             <div class="hot-item">
                             <h2>${name}</span></h2>
                             <p><i class="active">
                             <svg>
                                <use xlink:href="#icon-sq"></use>
                              </svg>
                              </i>${singer} - ${special}
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
       $('ol.hot-lists').append(li)
        }
        if(hotsearch){
            let li = `
            <li><a href="./song.html?id=${id}">${name}</a>
`
            $('.hot-lists').append(li)
        }
    }
}, function (error) {
});
//搜索框
let timer = null
let $output = $('#output')
$output.on('input',function(){
    //函数节流
    if(timer){
        window.clearTimeout(timer)}
        //定时器不能用普通的函数声明，因为this会被指定给timer
      timer = setTimeout(() => {
        timer = null
    //当内容删完后，让热门搜索现身，并删掉搜索结果
    if(this.value === ''){
        $('.hot-search').removeClass('clear')
        $('.searchAll > h3').empty()
        $('.searchAll  li').empty()
        $('#searchResults').html(null)
        return
    }
    let value = this.value.trim()
    //无论输入一个什么结果，让"热门搜索"消失
    $('.hot-search').addClass('clear')
    // 把搜索内容为空格时，它会打出所有结果，通过以下判断可以删除所有结果
    if(value === ''){
        return
    }
    $('.searchAll > h3').html(`搜索“${value}”`)
    var query1 = new AV.Query('Song');
    query1.contains('name',value);
    var query2 = new AV.Query('Song');
    query2.contains('singer',value);
    var query = AV.Query.or(query1,query2)
    query.find().then(function(result){
              // $('#searchResults').removeClass('hidden')
        //每次进来之前清空这个没有结果
        $('#searchResults').empty()
        if(result.length === 0){
              $('#searchResults').html('没有结果')
          }
        else {
              for (var i = 0; i < result.length; i++) {
                  let content = result[i].attributes
                  let {name,singer} = content
                  let id = result[i].id
                  let $li = `
                   <li class="border-bottom">
                       <a href="./song.html?id=${id}">
                                <svg>
                                    <use xlink:href="#icon-search"></use>
                                </svg>
                                <span>${name} ${singer}</span>
                       </a>
                  </li>
                 `
                  $('#searchResults').append($li)
              }
          }
    })
    },400)
})

