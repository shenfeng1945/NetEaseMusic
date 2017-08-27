/**
 * Created by lzc on 2017/8/26.
 */
var APP_ID = '82InV9gcyTzIw099BrTuO1wd-gzGzoHsz';
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
var songObject11 = new SongObject();
var songObject12 = new SongObject();
var songObject13 = new SongObject();
var songObject14 = new SongObject();
var songObject15 = new SongObject();
var songObject16 = new SongObject();
var songObject17 = new SongObject();
var songObject18 = new SongObject();
var songObject19 = new SongObject();
var songObject20 = new SongObject();
var songObject21 = new SongObject();
var songObject22 = new SongObject();
var songObject23 = new SongObject();
var songObject24 = new SongObject();
var songObject25 = new SongObject();
var songObject26 = new SongObject();
var songObject27 = new SongObject();
var songObject28 = new SongObject();
var songObject29 = new SongObject();
var songObject30 = new SongObject();
var songObject31 = new SongObject();
var songObject32 = new SongObject();
var songObject33 = new SongObject();
var songObject34 = new SongObject();
var songObject35 = new SongObject();
var songObject36 = new SongObject();
var songObject37 = new SongObject();
var songObject38 = new SongObject();
var songObject39 = new SongObject();
var songObject40 = new SongObject();
var songObject41 = new SongObject();
var songObject42 = new SongObject();
var songObject43 = new SongObject();
var songObject44 = new SongObject();
var songObject45 = new SongObject();
var songObject46 = new SongObject();
var songObject47 = new SongObject();
var songObject48 = new SongObject();
var songObject49 = new SongObject();
var songObject50 = new SongObject();
var songObject51 = new SongObject();
var songObject52 = new SongObject();
var songObject53 = new SongObject();
var songObject54 = new SongObject();
var songObject55 = new SongObject();
//周杰伦15首
var song1 = {
     'music': '告白气球',
     'singer': '周杰伦',
     'special':'周杰伦的床边故事',
     'url':''
}
var song2 = {
    'music': '晴天',
    'singer': '周杰伦',
    'special':'叶惠美',
    'url':''
}

var song3 = {
    'music': '七里香',
    'singer': '周杰伦',
    'special':'七里香',
    'url':''
}
var song4 = {
    'music': '稻香',
    'singer': '周杰伦',
    'special':'魔杰座',
    'url':''
}
var song5 = {
    'music': '彩虹',
    'singer': '周杰伦',
    'special':'我很忙',
    'url':''
}
var song6 = {
    'music': '最长的电影',
    'singer': '周杰伦',
    'special':'我很忙',
    'url':''
}
var song7 = {
    'music': '搁浅',
    'singer': '周杰伦',
    'special':'七里香',
    'url':''
}
var song8 = {
    'music': '说好的幸福呢',
    'singer': '周杰伦',
    'special':'魔杰座',
    'url':''
}
var song9 = {
    'music': '简单爱',
    'singer': '周杰伦',
    'special':'范特西',
    'url':''
}
var song10 = {
    'music': '青花瓷',
    'singer': '周杰伦',
    'special':'我很忙',
    'url':''
}
var song11 = {
    'music': '安静',
    'singer': '周杰伦',
    'special':'范特西',
    'url':''
}
var song12 = {
    'music': '烟花易冷',
    'singer': '周杰伦',
    'special':'跨时代',
    'url':''
}
var song13 = {
    'music': '给我一首歌的时间',
    'singer': '周杰伦',
    'special':'魔杰座',
    'url':''
}
var song14 = {
    'music': '明明就',
    'singer': '周杰伦',
    'special':'十二新作',
    'url':''
}
var song15 = {
    'music': '爱情废柴',
    'singer': '周杰伦',
    'special':'周杰伦的床边故事',
    'url':''
}
//薛之谦
var song16 = {
    'music': '暧昧',
    'singer': '薛之谦',
    'special':'暧昧',
    'url':''
}

var song17 = {
    'music': '演员',
    'singer': '薛之谦',
    'special':'绅士',
    'url':''
}
var song18 = {
    'music': '刚刚好',
    'singer': '薛之谦',
    'special':'初学者',
    'url':''
}
var song19 = {
    'music': '意外',
    'singer': '薛之谦',
    'special':'意外',
    'url':''
}
var song20 = {
    'music': '我害怕',
    'singer': '薛之谦',
    'special':'我害怕',
    'url':''
}
var song21 = {
    'music': '动物世界',
    'singer': '薛之谦',
    'special':'动物世界',
    'url':''
}
var song22 = {
    'music': '丑八怪',
    'singer': '薛之谦',
    'special':'意外',
    'url':''
}
var song23 = {
    'music': '其实',
    'singer': '薛之谦',
    'special':'意外',
    'url':''
}
var song24 = {
    'music': '认真的雪',
    'singer': '薛之谦',
    'special':'未完成的歌',
    'url':''
}
var song25 = {
    'music': '有没有',
    'singer': '薛之谦',
    'special':'意外',
    'url':''
}
//Beyond
var song26 = {
    'music': '海阔天空',
    'singer': 'Byond',
    'special':'海阔天空',
    'url':''
}

var song27 = {
    'music': '光辉岁月',
    'singer': 'Byond',
    'special':'光辉岁月十五年',
    'url':''
}
var song28 = {
    'music': '真的爱你',
    'singer': 'Byond',
    'special':'25周年精选',
    'url':''
}
var song29 = {
    'music': '喜欢你',
    'singer': 'Byond',
    'special':'25周年精选',
    'url':''
}
var song30 = {
    'music': '冷雨夜',
    'singer': 'Byond',
    'special':'25周年精选',
    'url':''
}
var song31 = {
    'music': '大地',
    'singer': 'Byond',
    'special':'秘密警察',
    'url':''
}
var song32 = {
    'music': 'Amani',
    'singer': 'Byond',
    'special':'25周年精选',
    'url':''
}
var song33 = {
    'music': '无悔这一生',
    'singer': 'Byond',
    'special':'真的见证',
    'url':''
}
var song34 = {
    'music': '我是愤怒',
    'singer': 'Byond',
    'special':'乐与怒',
    'url':''
}
var song35 = {
    'music': '无尽空虚',
    'singer': 'Byond',
    'special':'无尽空虚',
    'url':''
}
//王菲
var song36 = {
    'music': '匆匆那年',
    'singer': '王菲',
    'special':'匆匆那年',
    'url':''
}
var song37 = {
    'music': '红豆',
    'singer': '王菲',
    'special':'Eyes On Me',
    'url':''
}
var song38 = {
    'music': '暧昧',
    'singer': '王菲',
    'special':'菲主打',
    'url':''
}
var song39 = {
    'music': '笑忘书',
    'singer': '王菲',
    'special':'预言',
    'url':''
}
var song40 = {
    'music': '容易受伤的女人',
    'singer': '王菲',
    'special':'阿菲正传',
    'url':''
}
var song41 = {
    'music': '暗涌',
    'singer': '王菲',
    'special':'玩具',
    'url':''
}
var song42 = {
    'music': '约定',
    'singer': '王菲',
    'special':'情.菲.得意',
    'url':''
}
var song43 = {
    'music': '给自己的情书',
    'singer': '王菲',
    'special':'寓言',
    'url':''
}
var song44 = {
    'music': '百年孤寂',
    'singer': '王菲',
    'special':'只爱陌生人',
    'url':''
}
var song45 = {
    'music': '传奇',
    'singer': '王菲',
    'special':'传奇',
    'url':''
}
//电视剧
var song46 = {
    'music': '好春光',
    'singer': '吴彤',
    'special':'好春光',
    'url':''
}

var song47 = {
    'music': '只要有你',
    'singer': '那英/孙楠',
    'special':'少年包青天1 主题曲',
    'url':''
}
var song48 = {
    'music': '你爱我像谁',
    'singer': '张卫健',
    'special':'《小宝与康熙》',
    'url':''
}
var song49 = {
    'music': '相思',
    'singer': '毛阿敏',
    'special':'《西游记后传》片尾曲',
    'url':''
}
var song50 = {
    'music': '心爱',
    'singer': '金学峰',
    'special':'倚天屠龙记',
    'url':''
}
var song51 = {
    'music': '卷睫盼',
    'singer': '吴彤/陈琳',
    'special':'《春光灿烂猪八戒》片尾曲',
    'url':''
}
var song52 = {
    'music': '六月的雨',
    'singer': '氓小年',
    'special':'仙剑奇侠传',
    'url':''
}
var song53 = {
    'music': '英雄谁属',
    'singer': '卞留念',
    'special':'《太极宗师》主题曲',
    'url':''
}
var song54 = {
    'music': '枉凝眉',
    'singer': '陈力',
    'special':'《红楼梦》',
    'url':''
}
var song55 = {
    'music': '难念的经',
    'singer': '周华健',
    'special':'《天龙八部》主题曲',
    'url':''
}
//英文歌
var song56 = {
    'music': 'Faded',
    'singer': 'Alan Walker',
    'special':'Faded',
    'url':''
}
var song57 = {
    'music': 'Last Ride Of The Day',
    'singer': 'Nightwish',
    'special':'Showtime',
    'url':''
}
var song58 = {
    'music': 'I Just Wanna Run',
    'singer': 'The Downtown Fiction',
    'special':'Best I Never Had',
    'url':''
}
var song59 = {
    'music': 'I am',
    'singer': 'hitomi',
    'special':'犬夜叉 ベストソング ヒストリー',
    'url':''
}
var song60 = {
    'music': 'Sugar',
    'singer': 'Maroon 5',
    'special':'V',
    'url':''
}
var song61 = {
    'music': 'Something Just Like This',
    'singer': 'Anthony Keyrouz',
    'special':'Something Just Like This',
    'url':''
}
var song62 = {
    'music': 'We Are One(Ole Ola)',
    'singer': 'Pitbull',
    'special':'We Are One',
    'url':''
}
var song55 = {
    'music': 'Uptown Funk',
    'singer': 'Bruno Mars',
    'special':'Uptown Funk',
    'url':''
}
var song55 = {
    'music': '紅蓮の弓矢',
    'singer': 'Sound Horizon',
    'special':'進撃の軌跡',
    'url':''
}
var song55 = {
    'music': 'Dream It Possible',
    'singer': 'Delacey',
    'special':'Dream It Possible',
    'url':''
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
songObject11.set(song11)
songObject12.set(song12)
songObject13.set(song13)
songObject14.set(song14)
songObject15.set(song15)
songObject16.set(song16)
songObject17.set(song17)
songObject18.set(song18)
songObject19.set(song19)
songObject20.set(song20)
songObject21.set(song21)
songObject22.set(song22)
songObject23.set(song23)
songObject24.set(song24)
songObject25.set(song25)
songObject26.set(song26)
songObject27.set(song27)
songObject28.set(song28)
songObject29.set(song29)
songObject30.set(song30)
songObject31.set(song31)
songObject32.set(song32)
songObject33.set(song33)
songObject34.set(song34)
songObject35.set(song35)
songObject36.set(song36)
songObject37.set(song37)
songObject38.set(song38)
songObject39.set(song39)
songObject40.set(song40)
songObject41.set(song41)
songObject42.set(song42)
songObject43.set(song43)
songObject44.set(song44)
songObject45.set(song45)
songObject46.set(song46)
songObject47.set(song47)
songObject48.set(song48)
songObject49.set(song49)
songObject50.set(song50)
songObject51.set(song51)
songObject52.set(song52)
songObject53.set(song53)
songObject54.set(song54)
songObject55.set(song55)
var songs = [songObject1,songObject2,songObject3,songObject4,songObject5,songObject6,songObject7,songObject8,songObject9,songObject10,
             songObject11,songObject12,songObject13,songObject14,songObject16,songObject17,songObject18,songObject19,songObject20,songObject21,songObject22,
    songObject23,songObject24,songObject25,songObject26,songObject27,songObject28,songObject29,songObject30,songObject31,songObject32,songObject33,
    songObject34,songObject35,songObject36,songObject37,songObject38,songObject39,songObject40,songObject41,songObject42,songObject43,songObject44,
    songObject45,songObject46,songObject47,songObject48,songObject49,songObject50,songObject51,songObject52,songObject53,songObject54,songObject55]

AV.Object.saveAll(songs)
