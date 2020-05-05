<template>
    <div class="detail">
        <div class="detail_main">
            <ul class="detail_list">
                <div class="detail_header">
                    <img class="personAvatar" :src="avatar" alt="">
                    <p style="padding:10px 0">{{sign}}</p>
                    <h3>{{userName}}</h3>
                </div>
                <li @click="activeChange='isPersonInfo'" :class="{'isActive':activeChange=='isPersonInfo'}">个人信息</li>
                <li @click="activeChange='isSign'" :class="{'isActive':activeChange=='isSign'}">个性签名</li>
                <li @click="isAuthor?activeChange='isAvatar':''" :class="{'isActive':activeChange=='isAvatar','notAuthor':!isAuthor}">更改头像</li>
                <li @click="activeChange='isPhoto'" :class="{'isActive':activeChange=='isPhoto'}">照片墙</li>
                <li @click="activeChange='isComment'" :class="{'isActive':activeChange=='isComment'}">留言</li>
            </ul>
            <div class="detail_show">
                <div class="detail_sign text-algin-left" v-show="activeChange=='isSign'">
                    <h2 class="inline-block">我的签名:</h2>
                    <p class="inline-block fs-20 ml-10">
                        {{sign}}  
                        <el-button class="ml-10" v-if="isAuthor" type="primary" icon="el-icon-edit" size="mini" @click="signModalShow=true">
                        </el-button>
                    </p>
                </div>
                <div class="detail_personInfo" v-show="activeChange=='isPersonInfo'">
                    <ul>
                        <li ><h2  class="inline-block">生日:</h2><span class="fs-20 ml-20">{{birthday}}</span></li>
                        <li class=" mt-12 "><h2 class="inline-block">住址:</h2><span class="fs-20 ml-20">{{address}}</span></li>
                        <li class=" mt-12 "><h2 class="inline-block">工作地:</h2><span class="fs-20 ml-20">{{workAddress}}</span></li>
                        <li class=" mt-12 "><h2 class="inline-block">从事行业:</h2><span class="fs-20 ml-20">{{industry}}</span></li>
                        <li class=" mt-12 "><h2 class="inline-block">未来规划:</h2><span class="inline-block fs-20 ml-20 text-algin-left" style="width:500px;vertical-align: top">{{futurePlanning}}</span></li>
                        <li class=" mt-12 "><h2 class="inline-block">难忘的事:</h2>
                                <el-input
                                style="max-width:600px;color:#fff"
                                    class="ml-30 mt-12 fs-16"
                                    :autosize="{ minRows: 2, maxRows: 4}"
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    :disabled="true"
                                    v-model="unforgettable">
                                </el-input>
                        </li>
                        <li class=" text-algin-right"> 
                            <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                                    <el-button v-if="isAuthor" type="primary" icon="el-icon-edit" circle @click="personInfomodalShow=true"></el-button>
                            </el-tooltip>
                        </li>
                    </ul>
                </div>
                <div class="detail_changeAvatar" v-show="activeChange=='isAvatar'">
                    <el-upload
                        class="avatar-uploader"
                        action="http://localhost:3000/upload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
                <div class="detail_album " v-show="activeChange=='isPhoto'">
                    <el-button type="primary" size="mini" class="ml-20 mb-10" v-if="isAuthor" @click="uploadImgModalShow=true">上传<i class="el-icon-upload el-icon--right"></i></el-button>
                    <ul class="flex  flex-wrap align-items-center">
                        <li v-for="(item,index) in imgs" :key="index">
                            <i class="el-icon-close" @click="handleRemoveImg(index)" v-if="isAuthor"></i>
                            <img :src="item" :preview="index" preview-text="大熊猫" alt="">
                        </li>                       
                    </ul>
                </div>
                <div class="detail_comment" v-show="activeChange=='isComment'">
                    <ul class="detail_comment_wrap">
                        <li class="flex  flex-dir-row mb-10" v-for="(item,index) in comments" :key="index">
                            <div class="detail_comment_avatar">
                                <img :src="item.avatar" alt="">
                            </div>
                            <div class="detail_comment_main flex flex-dir-col ml-10">
                                <h4 class="detail_comment_name mb-5">{{item.commentUser}}</h4>
                                <span class="detail_comment_info fs-20 fw-b mb-10">{{item.text}}</span>
                                <span class="detail_comment_time" style="color:#999">{{item.time}}</span>
                            </div>
                        </li>
                        <div class="input">
                            <textarea rows="4" type="text"  placeholder="发表评论" v-model="commentText"/>
                            <div class="btn">
                                <el-button type="primary" size="small" @click="handleComment">发表</el-button>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
            <!-- 修改个性签名模态框 -->
            <el-dialog
                title="修改签名"
                :visible.sync="signModalShow"
                width="30%">
                <el-input v-model="sign" placeholder="请输入内容"></el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="signModalShow = false">取 消</el-button>
                    <el-button @click="makeSureSignModify">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 修改个人信息模态框 -->
             <el-dialog
                title="修改信息"
                :visible.sync="personInfomodalShow"
                width="35%">
                <ul class=" flex flex-wrap justify-content align-items-center">
                    <li class=" mt-12 ml-10 mb-10">
                        <h3 class="mb-10">生日:</h3>
                        <el-date-picker
                            v-model="birthday"
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </li>
                    <li class=" mt-12 ml-10 mb-10">
                        <h3 class="mb-10">住址:</h3><el-input v-model="address" placeholder="请输入内容"></el-input>
                    </li>
                    <li class=" mt-12 ml-10 mb-10">
                        <h3 class="mb-10">工作地:</h3><el-input v-model="workAddress" placeholder="请输入内容"></el-input>
                    </li>
                    <li class=" mt-12 ml-10 mb-10">            
                        <h3 class="mb-10">从事行业:</h3><el-input v-model="industry" placeholder="请输入内容"></el-input>
                    </li>
                    <li class=" mt-12 ml-10 mb-10">
                        <h3 class="mb-10">未来规划:</h3><el-input v-model="futurePlanning" placeholder="请输入内容"></el-input>
                    </li>
                    <li>
                        <h3>最难忘的事</h3>
                        <el-input
                                style="max-width:600px;color:#fff"
                                    class="ml-30 mt-12 fs-16"
                                    :autosize="{ minRows: 1, maxRows: 4}"
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="unforgettable">
                        </el-input>
                    </li>
                </ul>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="personInfomodalShow = false">取 消</el-button>
                    <el-button @click="makeSurePersonInfoModify">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 上传照片模态框 -->
            <el-dialog
                title="上传照片"
                :visible.sync="uploadImgModalShow"
                width="40%">
                <span slot="footer" class="dialog-footer" style="text-align:center;">
                    <el-upload
                        class="avatar-uploader"
                        action="http://localhost:3000/upload"
                        :show-file-list="true"
                        :on-success="handleUploadImgSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imgUrl" :src="imgUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script lang="ts">
import avatar from "../assets/bg.jpg";
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({})
export default class Detail extends Vue {
  public avatar: string = "";
  public imageUrl: string = "";
  public activeChange: string = "isPhoto";
  public userName: string = "";
  public signModalShow: boolean = false;
  public personInfomodalShow: boolean = false;
  public uploadImgModalShow: boolean = false;
  public sign: String = "";
  public birthday: String = "";
  public unforgettable: String = "";
  public address: String = "";
  public industry: String = "";
  public workAddress: String = "";
  public futurePlanning: String = "";
  public imgUrl: string = "";
  public imgs: string[] = [""];
  public commentText: string = "";
  public comments: object []=[{}];
  public userCount:string;
  public isAuthor:boolean=false;
  created() {
    //获取被浏览者的信息
    this.userName = this.$route.query.userName;
    this.$http.post("/user-info", { userName: this.userName }).then(res => {
      if (res.status == 201) {
        const {
          sign,
          birthday,
          unforgettable,
          address,
          industry,
          workAddress,
          futurePlanning,
          avatar,
          imgs
        } = res.data[0];
        this.sign = sign;
        this.birthday = birthday;
        this.unforgettable = unforgettable;
        this.address = address;
        this.industry = industry;
        this.avatar = avatar;
        this.workAddress = workAddress;
        this.futurePlanning = futurePlanning;
        this.imageUrl = avatar;
        this.imgs = imgs;
      }
    });
    //获取浏览者的信息
    const userCount=JSON.parse(window.localStorage.getItem("userCount"));
    this.userCount=userCount;
    if(!this.$cookies.isKey(`userAvatar_${userCount}`)){
      this.$http.post("/user-info",{userName:userCount}).then(res=>{
        console.log(res,"+++++");
          if(res.status==201){
            this.$cookies.set(`userAvatar_${userCount}`,res.data[0].avatar);
          }
      })
    }
    this.isAuthor=this.userName==userCount;
    this.getComment();
  }
  //格式化日期与时间
  get date() {
    const date = new Date();
    return `${date.getMonth() + 1}-${date.getDate()}  ${date.getHours()}:${date.getMinutes()>10?date.getMinutes():"0"+date.getMinutes()}`;
  }
  //调用接口修改数据
  updateInfo(editObject) {
    this.$http
      .put("/user-info/update", { userName: this.userName, editObject })
      .then(res => {
        console.log(res);
        if (res.status == 200) {
          this.$message({
            type: "success",
            message: "修改成功"
          });
        } else {
          this.$message({
            type: "error",
            message: "修改失败"
          });
        }
      });
  }
  //确定修改签名
  makeSureSignModify() {
    this.signModalShow = false;
    this.updateInfo({ sign: this.sign });
  }
  //点击修改个人信息
  makeSurePersonInfoModify() {
    const editObject = {
      birthday: this.birthday,
      unforgettable: this.unforgettable,
      address: this.address,
      industry: this.industry,
      workAddress: this.workAddress,
      futurePlanning: this.futurePlanning
    };
    this.updateInfo({ ...editObject });
    this.personInfomodalShow = false;
  }
  //头像上传成功的回调
  handleAvatarSuccess(res, file) {
    // this.data.course.cover=res.url
    console.log(res, file);
    const imgUrl = res.url.replace("\\", "/");
    const editObject = {
      avatar: imgUrl
    };
    this.updateInfo(editObject);
    this.avatar = imgUrl;
    this.imageUrl = URL.createObjectURL(file.raw);
  }
  //照片上传成功的回调
  handleUploadImgSuccess(res, file) {
    const imgUrl = res.url.replace("\\", "/");
    this.$http
      .put("/user-info/uploadImg", { url: imgUrl, userName: this.userName })
      .then(res => {
        if (res.status == 200) {
          this.$message({
            type: "success",
            message: "添加成功"
          });
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    this.imgs.unshift(imgUrl);
    this.imgUrl = URL.createObjectURL(file.raw);
  }
  //删除照片
  handleRemoveImg(index) {
    this.$confirm("此操作将永久删除该照片, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        this.$http
          .put("/user-info/deleteImg", { userName: this.userName, index })
          .then(res => {
            if (res.status == 200) {
              this.imgs.splice(index, 1);
              this.$message({
                type: "success",
                message: "删除成功"
              });
            } else {
              this.$message({
                type: "error",
                message: res.message
              });
            }
          });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
  }
  //获取留言板列表
  getComment(){
      this.$http.post("/user-info/getComment",{userName:this.userName}).then(res=>{
          if(res.status==201){
            this.comments=res.data[0].comments;
          }
      })
  }
  //评论
  handleComment(){
      if(this.commentText==""){
        this.$message({
          type:"error",
          message:"评论不能为空"
        })
        return;
      }
      const commentUser=this.userCount;
      const avatar=this.$cookies.get(`userAvatar_${commentUser}`);
      const postObj={
          commentUser,
          avatar,
          time:this.date,
          text:this.commentText,
      }
      this.$http.post("/user-info/addComment",{userName:this.userName,commentInfo:postObj}).then(res=>{
          if(res.status==201){
            this.commentText="";
            this.getComment();
            this.$message({
              type:"success",
              message:"评论成功"
            })
          }
      })
  }
  beforeAvatarUpload(file) {
    const isJPG = file.type === "image/jpeg";
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isJPG) {
      this.$message.error("上传头像图片只能是 JPG 格式!");
    }
    if (!isLt2M) {
      this.$message.error("上传头像图片大小不能超过 2MB!");
    }
    return isJPG && isLt2M;
  }
}
</script>
<style lang="scss" scoped>
.detail {
  background: url("../assets/info.jpg") no-repeat center;
  display: inline-block;
  position: absolute;
  width: 100%;
  height: 100%;
  // text-align: center;
  &_header {
    .personAvatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    text-align: center;
    p {
      font-size: 16px;
      font-weight: 600;
      color: #000;
    }

  }
  .isActive {
    box-shadow: 1px 1px 1px rgb(185, 167, 167);
  }
  .notAuthor{
      cursor:not-allowed !important;
      color: #948b8b !important;
  }
  .notAuthor:hover{
    cursor: not-allowed !important;
    box-shadow:none !important;
    
  }
  .detail_main {
    width: 900px;
    height: 480px;
    margin: 10px auto;
    display: block;
    // background: #fff;
    padding: 10px;
    border-radius: 4px;
    // opacity: .7;
    box-sizing: border-box;
    position: relative;
    .detail_list {
      width: 100px;
      display: inline-block;
      position: absolute;
      left: 20px;
      background: #fff;
      border-radius: 4px;
      padding: 10px 10px 200px;
      li {
        padding: 6px 6px;
        color: rgb(97, 49, 49);
        font-weight: 500;
        font-size: 20px;
        letter-spacing: 2px;
        border-radius: 4px;
        margin-top: 6px;
        text-align: justify;
        height: 30px;
      }
      li::after {
        display: inline-block;
        width: 100%;
        content: "";
      }
      li:hover {
        cursor: pointer;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
      }
    }
    .detail_show {
      position: absolute;
      right: 10px;
      background: #fff;
      width: calc(100% - 160px);
      border-radius: 4px;
      padding: 20px;
      box-sizing: border-box;
      .detail_personInfo {
        h2 {
          width: 100px;
          text-align: right;
        }
      }
      .detail_changeAvatar {
        text-align: center;
      }
      .detail_album {
        background: #000;
        opacity: 0.9;
        padding-top: 20px;
        max-height: 600px;
        overflow: auto;
        ul {
          width: 100%;
          height: 100%;
          li {
            margin-left: 20px;
            margin-bottom: 20px;
            position: relative;
            i {
              position: absolute;
              right: 4px;
              top: 2px;
              z-index: 100;
              font-size: 20px;
              cursor: pointer;
              color: #000;
              display: none;
            }
            i:hover {
              color: red;
            }
            img {
              width: 116px;
              height: 116px;
              cursor: pointer;
            }
          }
          li:hover {
            i {
              display: inline-block;
            }
          }
        }
      }
      .detail_album::-webkit-scrollbar {
        width: 4px;
      }
      .detail_album::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px rgba(190, 190, 190, 0.2);
        border-radius: 0;
        background: rgba(177, 177, 177, 0.1);
      }
      .detail_album::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(255, 145, 0, 0.8);
        background: rgba(110, 58, 58, 0.2);
      }
      .detail_comment {
        height: 598.2px;
        &_wrap {
          height: 100%;
          overflow: auto;
          position: relative;
        }
        &_wrap::-webkit-scrollbar {
          width: 4px;
        }
        &_wrap::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 5px rgba(190, 190, 190, 0.2);
          border-radius: 0;
          background: rgba(177, 177, 177, 0.1);
        }
        &_wrap::-webkit-scrollbar-thumb {
          border-radius: 10px;
          -webkit-box-shadow: inset 0 0 5px rgba(255, 145, 0, 0.8);
          background: rgba(110, 58, 58, 0.2);
        }
        &_avatar {
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
        }
        &_main {
          width: 100%;
          padding-bottom: 10px;
          border-bottom: 1px solid rgb(209, 209, 209);
        }
        //   &_area{
        //     position: -webkit-sticky;
        //     position: sticky;
        //     bottom: 0px;
        //   }
        .input {
          position: -webkit-sticky;
          position: sticky;
          // position: absolute;
          bottom: 0px;
          width: 100%;
          // background-color: #fff;
          background-color: #fafafa;
          textarea {
            background-color: #fafafa;
            letter-spacing: 1px;
            height: 40px;
            width: 100%;
            border: none;
            padding: 5px 10px;
            box-sizing: border-box;
            border-top: 1px solid rgb(209, 209, 209);
            outline: none;
          }
        .btn{
            // background-color: #fff;
            text-align: right;
            width: 100%;
        }
        }
      }
    }
  }
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 140px;
  height: 140px;
  line-height: 140px;
  text-align: center;
  position: relative;
}
.avatar-uploader-icon::before {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
