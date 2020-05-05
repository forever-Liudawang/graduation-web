<template>
    <div class="stuList">
        <h1>
            学生列表
        </h1>
        <el-card>
            <div class="avatar-wrap" >
                <div class="list-item" v-for="(item,index) in users" :key="index"  @click="handleLink(item)">
                    <el-avatar size="medium" :src="imgUrl"></el-avatar>
                    <span class="name">{{item}}</span>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
Component.registerHooks([
        'beforeRouteEnter',
]);
@Component({})
export default class StudentList extends Vue {
        public imgUrl:string="";
        public users:Array<String>=['刘敏','吴伟兵','李霜','蒋小霞','刘敏','刘谋焰','李霜','蒋小霞','蒙舰航','黄沛沛','郑凯','朱玲','彭涛','谢伟','刘钟彪','张亚男','黄沛沛','吴伟兵','李霜','蒋小霞','蒙舰航','黄沛沛','郑凯','朱玲','彭涛','谢伟','刘钟彪','张亚男','黄沛沛','郑凯','朱玲','彭涛','谢伟','刘钟彪','张亚男','蒙舰航','黄沛沛','郑凯','朱玲','彭涛',]
        handleLink(item){
            this.$router.push({
                name:'Detail',
                query:{
                    userName:item
                }
            });
        }
        created(){
            this.$http.post("/user-info").then(res=>{
                this.imgUrl=res.data[0].avatar;
            })
        }
        beforeRouteEnter (to, from, next) {
            console.log(from)
        }
};
</script>


<style lang="scss" scoped>
.stuList{
    // opacity: .7
}
h1{
    font-weight: bold;
    color: rgb(255, 255, 255);
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
    color: #e6a23c !important;
}
.list-item{
    display:flex;
    flex-direction: column;
    cursor: pointer;
    margin-left: 20px;
    margin-bottom: 20px;
    align-items: center;
    justify-content: center;
}
.list-item:hover{
    transform: scale(1.2);
}
.avatar-wrap{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}
span{
    font-size: 12px;
    margin-top: 4px;
    color: rgb(0, 0, 0);
    width: 36px;
}
.name{
    color:#8d3c0c;
    font-weight: 600;
}
</style>
