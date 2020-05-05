<template>
    <div>
         <Aplayer class="musicPlay" 
         :listFolded="true"  
         :float="true" 
         :music="{title: '晴天',artist: '周杰伦',src:require('../static/晴天_周杰伦_128K.mp3'),lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'}" 
         :autoplay="true" 
         :list="music" />
    </div>
</template>

<script>

import Aplayer from "vue-aplayer";
import song from '../static/晴天_周杰伦_128K.mp3'
import song1 from '../static/稻香_周杰伦_128K.mp3'
import song2 from '../static/等你下课_周杰伦_128K.mp3'
import song3 from '../static/花海_周杰伦_128K.mp3'
export default {
    components:{
       Aplayer
    },
    data(){
       return{
          music:[{title: '晴天',artist: '周杰伦',src: song,lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'},
               {title: '稻香',artist: '周杰伦',src: song1,lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'},
               {title: '等你下课',artist: '周杰伦',src: song2,lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'},
               {title: '花海',artist: '周杰伦',src: song3,lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'}]
       }
    }
}
</script>


<style scoped>
.musicPlay{
  width:400px;
  /* height:200px; */
  position:absolute;
  z-index:10000 !important;
  left:20px;
  top:10%;
  /* transform:translateX(-50%) !important; */
}
.musicPlay /deep/.aplayer-pic:hover{
  cursor:move;
}
</style>
