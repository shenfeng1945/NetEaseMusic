var APP_ID = '82InV9gcyTzIw099BrTuO1wd-gzGzoHsz';
var APP_KEY = 'qCBb2prMElwslrBNaryawyER';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});
var query = new AV.Query('Spec');
let url = window.location.href
let reg = /.*\=(.*)/
let number = url.match(reg)[1]
query.find().then(function (results) {
    console.log(typeof results)
    for(let i=0;i<results.length;i++){
       let array = results[i].attributes
        console.log(array[i]['number'] === number)
        if(array[i]['number'] === number){
            getMessage({
                fullname: array[i]['fullname'],
                head: array[i]['head'],
                summary: array[i]['summary']
            })
        }
    }
})

    function getMessage(options){
        let {fullName,head,summary} = options
        let $img = document.querySelector('.art-head > img')
        $img.src = head
        $('.art-head > .name').text(fullName)
        $('.summary > p').text(summary)
    }



