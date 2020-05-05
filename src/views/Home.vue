<template>
<div class="home">
    <el-carousel :interval="3000"  height="250px" type="card" :autoplay="true">
        <el-carousel-item v-for="(item,index) in imgSrc" :key="item" :class='{"expand":index==isActive}'>
            <img :src="item" alt="" @click="handleExpansion(index)" >
        </el-carousel-item>
    </el-carousel>
    <el-dialog
      :visible.sync="dialogVisible"
      width="70%">
      <img class="scaleImg" :src="require(`../assets/${index+1}.jpg`)"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-container>
        <el-aside width="350px">
            <comment/>
        </el-aside>
        <el-main>
            <Main/>
        </el-main>
        <el-aside width="350px">
            <student-list/>
        </el-aside>
    </el-container>
  </div>
</template>

<script lang="ts">
import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg'
import img3 from '../assets/3.jpg'
import img4 from '../assets/4.jpg'
import Comment from '../components/comment'
import StudentList from '../components/studentList'
import Main from '../components/main'
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component({
  components:{
    Comment,
    StudentList,
    Main,
  }
})
export default class Home extends Vue {
        private imgSrc: String  []=[img1,img2,img3,img4]
        private isActive?:number=0
        private dialogVisible:boolean=false
        private index:number=0
        private isFirstLogin:boolean=true;
        handleExpansion(index:number){
          this.index=index;
          this.dialogVisible=true;
          this.isActive=index;
        }
};
</script>



<style scoped>
.expand:hover{
  transform: scale(1.2);
}
.home{
  background:url('../assets/sky.jpg') no-repeat center;
  background-size: cover;

}

.scaleImg{
  width: 100%;
}
 .el-carousel__item img {
    width: 100%;
    height: 100%;

  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .el-main{
      padding: 0;
  }
  .el-container{
    padding: 0 14px;
  }
  .stuList .el-card__body{
     display: flex;
     justify-content: space-around;
  }
  .ending{
    padding: 10px 20px;
    color: #ffffff;
    font-size: 20px;
    text-align: center;
  }

</style>
