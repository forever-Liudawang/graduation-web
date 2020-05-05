<template>
    <div class="album">
        <img v-for="(item,index) in 28" 
        :key="item"
        :preview="1" 
        :src="require(`../assets/j${item}.jpg`)" 
        :class="{'r1':item%2==0,'r2':item%3==0,'r3':item%5==0,'r4':item%7==0}" alt="">
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component({})
export default class Album extends Vue {
            
};
</script>


<style lang="scss" scoped>
    .album{
        padding: 30px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        background-color:rgba(8, 81, 240, 0.5);
        // background: url('../static/1.jpg') no-repeat center; 
        position: relative;
        img{
            width: 280px;
            border-radius: 4px;
            margin-bottom: 30px;
            cursor: pointer;
            transition:all 1.5s;
        }
        img:hover{
            transform: scale(1.5);
            z-index: 100;
            box-shadow: 3px 3px 8px #000;
            
        }
        .r1{
            transform: rotateZ(-5deg)
        }
        .r2{
            transform: rotateZ(-10deg)
        }
        .r3{
            transform: rotateZ(5deg)
        }
        .r3{
            transform: rotateZ(10deg)
        }    
    }
</style>
