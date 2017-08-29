/**
 * Created by lzc on 2017/8/28.
 */
var APP_ID = '82InV9gcyTzIw099BrTuO1wd-gzGzoHsz';
var APP_KEY = 'qCBb2prMElwslrBNaryawyER';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});
var SpecialObject = AV.Object.extend('Song')
var sObject = new SpecialObject()
sObject.save({
    name:"枉凝眉",
    lyric: "[00:00.00] 作曲 : 王立平\n[00:01.00] 作词 : 曹雪芹\n[00:08.789]一个是阆苑仙葩\n[00:17.559]一个是美玉无瑕\n[00:25.499]若说没奇缘\n[00:33.149]今生偏又遇着他\n[00:42.999]若说有奇缘\n[00:51.890]如何心事终虚化\n[01:05.318]啊啊 啊啊啊啊啊啊啊 啊啊\n[01:19.360]\n[01:21.130]一个枉自嗟呀\n[01:29.400]一个空劳牵挂\n[01:36.340]一个是水中月\n[01:43.159]一个是镜中花\n[01:51.600]想眼中\n[01:55.189]能有多少泪珠儿\n[02:05.980]怎经得秋流到冬尽\n[02:15.394]春流到夏\n[02:26.385]\n[02:28.440]啊啊 啊啊啊啊啊啊 啊\n[02:46.383]\n",
    singer:"陈力",
    special: '红楼梦歌曲集',
    number:'four',
    song:"//ovblnc0kq.bkt.clouddn.com/%E5%A5%BD%E6%98%A5%E5%85%89.mp3",
    img:"https://ws1.sinaimg.cn/large/af2310f9gy1fj0uuu9e39j20k00jx3zw.jpg",
    background:"https://i.loli.net/2017/08/29/59a55aa29809f.jpg"
})

