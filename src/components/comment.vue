<template>
    <div class="comment"  @mouseover="handleMouse" @mouseout="showBtn=false">
        <el-button type="text" icon="el-icon-search" @click="showTable_search = true"  :class="{'btn-show-search':showBtn,'btn-hidden':!showBtn,'searchBtn':true}">点击搜索</el-button>
        <h1>留言板</h1>
        <el-button type="text" icon="el-icon-edit" @click="showTable_comment = true"  :class="{'btn-show-comment':showBtn,'btn-hidden':!showBtn}">点击留言</el-button>
        <div class="comment-wrap">
                <el-card class="box-card" shadow="hover" v-for="(item,index) in commentItem" :key="index">
                    <div slot="header" class="clearfix">
                        <span>{{item.userName+" 👇"}}</span>
                    </div>
                    <p>{{item.commentInfo}}</p>
                </el-card>
        </div>
        <el-dialog title="留言板" :visible.sync="showTable_comment" :modal="false" top="250px" width="600px">
            <el-form  ref="commentInfo">
                <el-form-item label="留言" prop="commentText">
                    <el-input type="textarea" v-model="commentText"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitText()">创建</el-button>
                    <el-button @click="resetText()">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="搜索留言" :visible.sync="showTable_search" :modal="false" top="250px" width="300px">
                <el-input
                    placeholder="请输入名字搜索"
                    prefix-icon="el-icon-search"
                    width="90%"
                    style="width:250px"
                    v-model="searchName">
                </el-input>
        </el-dialog>
    </div>
</template>

<script lang="ts">

import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
@Component({})
export default class Comment extends Vue {
        public commentText:String=""
        public showTable_comment:Boolean=false
        public showTable_search:Boolean=false
        public showBtn:Boolean=false;
        public commentItem:Array<Object>=[];
        public searchName:String="";
        rules={
            commentText:[{ required: true, message: '留言不能为空', trigger: 'blur' }],
        }
        /**鼠标事件 */
        handleMouse(e){
            this.showBtn=true;
        }
        /** 提交留言*/
        async submitText(){
            if(this.commentText==""){
                this.$message({
                    type:"error",
                    message:"留言不能为空"
                })
                return;
            }
                const userName=JSON.parse(window.localStorage.getItem("userCount"));
                this.$http.post("/comment",{userName,commentInfo:this.commentText}).then(res=>{
                    if(res.status==201||res.status==200){
                        this.commentItem=res.data;
                    }
                    this.$message({
                        type:"success",
                        message:"留言成功"
                    })
                    this.resetText();
                    this.showTable=false;
                })
        }

        /**根据名字搜索留言 */
        // async search(){
        //     console.log(this.searchName)
        //     this.$http.post("/comment/searchComment",{name:this.searchName}).then(res=>{
        //         if(res.status=="201"){
        //             this.commentItem=res.data;
        //         }
        //     })
        // }

        @Watch('searchName')
        search(){
            this.$http.post("/comment/searchComment",{name:this.searchName}).then(res=>{
                if(res.status=="201"){
                    console.log(res.data)
                    this.commentItem=res.data;
                }
            })
        }
        /**所有留言 */
        async allComment(){
            const res=await this.$http.post("/comment");
            this.commentItem=res.data;
        }
        resetText(){
            this.commentText="";
        }
        
        async created(){
           this.allComment();
        }
};
</script>


<style lang="scss" scoped>
h1{
    font-weight: bold;
    color: rgb(255, 255, 255);
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
    color: #e6a23c;
}
.el-input{
    width: 100px;
}
.btn-show-comment{
    position: absolute;
    top: 0;
    display: block;
    font-size: 20px;
    font-weight: bold;
    right: 20px;
}
.btn-show-search{
    position: absolute;
    top: 0;
    display: block;
    font-size: 20px;
    font-weight: bold;
    left: -50px;
}
.btn-hidden{
    display: none;
}
.comment{
    // opacity: .7;
    position: relative;
}
.comment-wrap{
    max-height: 680px;
    overflow: auto;
}

.comment-wrap::-webkit-scrollbar{
    width: 4px;
}
.comment-wrap::-webkit-scrollbar-track {
     -webkit-box-shadow: inset 0 0 5px rgba(190, 190, 190, 0.2);
    border-radius: 0;
    background: rgba(177, 177, 177, 0.1);
}
.comment-wrap::-webkit-scrollbar-thumb{
     border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(255, 145, 0, 0.8);
    background: rgba(110, 58, 58, 0.2);
}
.el-button{
    margin-left: 60px;
    >>>span{
        font-weight: 600;
       
    }
}
.text {
    font-size: 14px;
}
span{
    color: rgb(187, 187, 187);
}
p{
    font-size: 16px;
}
.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}
.el-card{
    border-radius: 0;
    color: #000;
     cursor: pointer;
     span{
         color:#8d3c0c;
         font-weight: 600;
     }
}
.el-card:hover{
        transform: scale(1.2);
        box-shadow: 2px 2px 2px #000;
        padding:0 30px;
        box-sizing: border-box;
}

.el-card:first-of-type{
    border-radius: 4px 4px 0 0;
}
.el-card >>>.el-card__header{
    padding: 9px 10px !important;
}
</style>
<style>
  .el-card__header{
    padding: 9px 10px !important;
    background: #ca7711bf;
    /* opacity: .8; */
}
.el-card__body{
    background: #ca7711bf;
    /* opacity: .8; */
   
}
</style>

