    //搜索框
    let timer = null
export default function doIt() {
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
