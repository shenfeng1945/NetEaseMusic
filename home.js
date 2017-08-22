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
