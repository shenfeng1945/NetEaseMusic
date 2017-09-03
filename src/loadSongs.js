!function ($,AV,window) {
    loadSongs()
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
}(jQuery,AV,window)