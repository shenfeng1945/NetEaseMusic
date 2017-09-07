/**
 * Created by lzc on 2017/8/22.
 */
define(function(){
    function tabs(selectorOrDom) {
        let $tabs = $(selectorOrDom)
        $tabs.on('click', '.tabs-nav > li', function () {
            let $li = $(this)
            let index = $li.index()
            $li.addClass('active').siblings('.active').removeClass('active')
            // console.log($('.tabsContent > li').eq(index))
            $li.closest('.tabs').find('.tabsContent').children().eq(index).addClass('active').siblings('.active').removeClass('active')
        })
    }
return tabs;
})

