require(['load-songs','search','home'],function(loadSongs,doIt,tabs){
    tabs('.tabs')
    loadSongs()
    doIt()
})
require.config({
    paths:{
        "home": "../home"
    }
})