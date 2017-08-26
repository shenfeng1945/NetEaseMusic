/**
 * Created by lzc on 2017/8/26.
 */
ar APP_ID = '82InV9gcyTzIw099BrTuO1wd-gzGzoHsz';
var APP_KEY = 'qCBb2prMElwslrBNaryawyER';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});


//这是单个的保存到leancloud
//选择数据库
var SongObject = AV.Object.extend('Search');
//在数据库里生成新的记录
var songObject1 = new SongObject();
var songObject2 = new SongObject();
var songObject3 = new SongObject();
var songObject4 = new SongObject();
var songObject5 = new SongObject();
var songObject6 = new SongObject();
var songObject7 = new SongObject();
var songObject8 = new SongObject();
var songObject9 = new SongObject();
var songObject10 = new SongObject();
var song1 = {
    'music':'123木头人',
    'singer':'黑Girl - 粉红高压电',
    'url':'http://ov4sliu3n.bkt.clouddn.com/123%E6%9C%A8%E5%A4%B4%E4%BA%BA.mp3',
    'hasSq':'false'
}
var song2 = {
    'music':'一生有你',
    'singer':'水木年华 - 毕业纪念册',
    'url':'http://ov4sliu3n.bkt.clouddn.com/%E4%B8%80%E7%94%9F%E6%9C%89%E4%BD%A0.mp3',
    'hasSq':'false'
}
var song3 = {
    'music':'光辉岁月',
    'singer':'Beyond - 25周年精选',
    'url':'http://ov4sliu3n.bkt.clouddn.com/%E5%85%89%E8%BE%89%E5%B2%81%E6%9C%88.mp3',
    'hasSq':'true'
}
var song4 = {
    'music':'冷雨夜',
    'singer':'Beyond - 25周年精选',
    'url':'http://ov4sliu3n.bkt.clouddn.com/%E5%86%B7%E9%9B%A8%E5%A4%9C.mp3',
    'hasSq':'true'
}
var song5 = {
    'music':'我的一个道姑朋友',
    'singer':'以冬 - 我的一个道姑朋友',
    'url':'http://ov4sliu3n.bkt.clouddn.com/%E6%88%91%E7%9A%84%E4%B8%80%E4%B8%AA%E9%81%93%E5%A7%91%E6%9C%8B%E5%8F%8B.mp3',
    'hasSq':'false'
}
var song6 = {
    'music':'美丽的神话',
    'origin':'(电视剧《神话》片尾曲)',
    'singer':'胡歌 / 白冰 - 《神话》电视原声带' ,
    'url':'http://ov4sliu3n.bkt.clouddn.com/%E7%A5%9E%E8%AF%9D.mp3',
    'hasSq':'true'
}
var song7 = {
    'music':'老男孩',
    'origin':'(电影《老男孩》主题曲)',
    'singer':'筷子兄弟 - 父亲' ,
    'url':'http://ov4sliu3n.bkt.clouddn.com/%E8%80%81%E7%94%B7%E5%AD%A9.mp3',
    'hasSq':'false'
}
var song8 = {
    'music':'烟花易冷',
    'singer':'周杰伦 - 跨时代' ,
    'url':'http://ov4sliu3n.bkt.clouddn.com/%E7%83%9F%E8%8A%B1%E6%98%93%E5%86%B7.mp3',
    'hasSq':'true'

}
var song9 ={
    'music':'记事本',
    'singer':'陈慧琳 - 音乐记事本' ,
    'url':'http://ov4sliu3n.bkt.clouddn.com/%E8%AE%B0%E4%BA%8B%E6%9C%AC.mp3',
    'hasSq':'false'
}
var song10 = {
    'music':'月光',
    'origin':'(动画《秦时明月》主题曲)',
    'singer':'胡彦斌Tiger Hu - 秦时明月 原生打碟' ,
    'url':'http://ov4sliu3n.bkt.clouddn.com/%E7%A7%A6%E6%97%B6%E6%98%8E%E6%9C%88.mp3',
    'hasSq':'false'
}
songObject1.set(song1)
songObject2.set(song2)
songObject3.set(song3)
songObject4.set(song4)
songObject5.set(song5)
songObject6.set(song6)
songObject7.set(song7)
songObject8.set(song8)
songObject9.set(song9)
songObject10.set(song10)
var songs = [songObject1,songObject2,songObject3,songObject4,songObject5,songObject6,songObject7,songObject8,songObject9,songObject10]
AV.Object.saveAll(songs)
