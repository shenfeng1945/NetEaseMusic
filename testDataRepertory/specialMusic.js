/**
 * Created by lzc on 2017/8/28.
 */
var APP_ID = '82InV9gcyTzIw099BrTuO1wd-gzGzoHsz';
var APP_KEY = 'qCBb2prMElwslrBNaryawyER';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});
var SpecialObject = AV.Object.extend('Spec')
var sObject = new SpecialObject()
sObject.save({
    number: 'six',
    fullname: '好听的英语、日语歌',
    head:'//ws1.sinaimg.cn/large/af2310f9gy1fizt48c4t4j20hs0egdg6.jpg',
    summary: '温柔的歌声已消逝，乐音仍在记忆里萦回；紫罗兰花虽然枯死，意识中尚存留着芳菲。玫瑰花朵一朝谢去，落英堆成恋人的床帏；你去后怀念你的思绪,该是爱情在上面安睡。'
})
