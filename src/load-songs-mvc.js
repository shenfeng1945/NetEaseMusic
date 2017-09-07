var songModel = {
    results: null,
    getAll: function () {
        var query = new AV.Query('Song');
        return query.find().then(function (results) {
            this.results = results
        }.bind(this))
    }
}
var songView = {
    template1: function (options) {
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
    },
    template2: function (options) {
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
    },
    template3: function (options) {
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
    },
    template4: function (options){
        let {id,name} = options
        return `
            <li><a href="./song.html?id=${id}">${name}</a>
             `
    }
}
var songControl = {
    $element1: null,
    $element2: null,
    $element3: null,
    model: songModel,
    view: songView,
    count: 0,
    init: function (selector1,selector2,selector3) {
        this.$element1 = $(selector1)
        this.$element2 = $(selector2)
        this.$element3 = $(selector3)
        this.model.getAll().then(function () {
            this.render()
        }.bind(this))
    },
    isNewMusic: function (options) {
        let { id, name, singer, special, hasSq, newmusic } = options
        //选择最新音乐
        if(newmusic){
            if(hasSq){
                let $li = this.view.template1({ id, name, singer, special })
                this.$element1.append($li)

            }else if(! hasSq){
                let $li = this.view.template2({ name, id, singer, special })
                this.$element1.append($li)
            }
        }
    },
    isHotMusic: function (options) {
        let { id, name, singer, special, hotsong } = options
        let count = this.count
        //选择热歌榜
        if (hotsong) {
            count +=1
            this.count = count
            if (count < 10) { count = '0' + count }
            let li = this.view.template3({ name, id, singer, special, count })
            this.$element2.append(li)
        }
    },
    isHotSearch: function (options) {
        let { hotsearch, id, name } = options
        if (hotsearch) {
            let li = this.view.template4({id,name})
            this.$element3.append(li)
        }
    },
    render: function () {
        $('.new-music > .loading').css('display', 'none')
        let results = songModel.results
        let count = this.count
        for (let i = 0; i < results.length; i++) {
            let id = results[i].id
            let content = results[i].attributes
            let { name, singer, hasSq, newmusic, special, hotsong, hotsearch } = content
            this.isNewMusic({ newmusic, hasSq, id, name, singer, special })
            this.isHotMusic({ id, name, singer, special, hotsong })
            this.isHotSearch({ hotsearch, id, name })
        }
    }
}
songControl.init('.new-lists','ol.hot-lists','.hot-search-lists')
