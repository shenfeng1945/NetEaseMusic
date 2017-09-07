require(['../home.js','./load-songs','./search'],function(tabs,loadSongs,doIt){
   tabs('.tabs')
   loadSongs()
   doIt()
})