/**
 * Created by lzc on 2017/8/27.
 */
var APP_ID = '82InV9gcyTzIw099BrTuO1wd-gzGzoHsz';
var APP_KEY = 'qCBb2prMElwslrBNaryawyER';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});
var SongObject = AV.Object.extend('Lyric');
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
var song1 = {
    'name':'123木头人',
    'singer':'黑Girl',
    'lyric':''
}
var song2 = {}
var song3 = {}
var song4 = {}
var song5 = {}
var song6 = {}
var song7 = {}
var song8 = {}
var song9 = {}
var song10 = {}
var song11 = {}
var song12 = {}
var song13 = {}
var song14 = {}
var song15 = {}
var song16 = {}
var song17 = {}
var song18 = {}
var song19 = {}
var song20 = {}
var song21 = {}
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
var songs = [song1,song2,song3,song4,song5,song6,song7,song8,song9,song10,song11,song12,song13,song14,song15,song16,song17,song18,
    song19,song20,song21,song22,song23,song24,song25,song26,song27,song28]
AV.Object.saveAll(songs)
