<template>
    <div class="talkRoom">  
        <h1>议政厅</h1>
        <span class="showNum"><b>{{userName}}</b>来啦</span>
        <div>当前在线人数:{{userNum}}</div>
        <div id="talkBox">
            <ul id="itemWrap" ref="ul">
                <!-- <li class="item">
                    <span class="avator">小梦</span>
                    <span class="info">我去你妈的fuck</span>
                </li>
                <li class="item-me">
                    <span class="info">我去你妈的fuck</span>
                    <span class="avator">我</span>
                </li> -->
            </ul>
        </div>
        <div class="msgWrap">
            <el-input
                class="input"
                type="textarea"
                :rows="1"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="textareaText">
            </el-input>
            <div class="btn">
                <el-button type="info" size="medium" @click="handleClick()">发送</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
        textareaText:"",
        userName:"",
        userNum:0,
        fromUser:""
    };
  },
  methods: {
       getTelp(str){
        let telp="";
        console.log(this.userName,this.fromUser);
        if(this.userName==this.fromUser){
            telp=`<li class="item-me">
                        <span class="info">${str}</span>
                        <span class="avator">我</span>
                </li>`
        }else{
            telp=`<li class="item">
                    <span class="avator">${this.fromUser}</span>
                    <span class="info">${str}</span>
                </li>`
        }
        return telp; 
    },
    handleClick(){
        if(this.textareaText==""){
            return;
        }
        this.$socket.emit("send",this.textareaText);
        this.textareaText="";
    }
  },
  sockets:{
      link:function(data){
            const {userName,userNum}=data;
            console.log(userName);
            this.userNum=userNum;
            this.fromUser=userName;
      },
      message:function(data){
             const telp=this.getTelp(data);
             this.$refs.ul.innerHTML+=telp
      },
  },
  mounted(){
      const userName=JSON.parse(this.$store.state.userName);
      this.userName=userName;
      this.$socket.emit('link',this.userName)
  }
};
</script>

<style>
#talkBox{
    border-radius: 4px;
    width: 600px;
    height: 400px;
    margin: 0 auto;
    padding: 10px 10px;
    background-color: rgb(224, 224, 224);
    overflow: auto;
}
#talkBox::-webkit-scrollbar{
    width: 4px;
}
#talkBox::-webkit-scrollbar-track {
     -webkit-box-shadow: inset 0 0 5px rgba(190, 190, 190, 0.2);
    border-radius: 0;
    background: rgba(177, 177, 177, 0.1);
}
#talkBox::-webkit-scrollbar-thumb{
     border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(51, 51, 51, 0.2);
    background: rgba(61, 61, 61, 0.2);
}

ul{
    list-style: none;

}
.item{
    
    text-align: left;
    margin-bottom: 10px;
}
.item-me{
    margin-bottom: 10px;
    text-align: right;
}
.item .avator,.item-me .avator{
    text-align: center;
    line-height: 22px;
    font-size: 14px;
    /* width: 40px; */
    padding: 4px 6px;
    height: 22px;
    border-radius: 4px;
    display: inline-block;
    background-color: #fff;
}
.item .info,.item-me .info{
    vertical-align: middle;
    border-radius: 4px;
    display: inline-block;
    padding: 4px 6px;
    position: relative;
    margin-left: 10px;
    background-color: #fff;
    max-width: 300px;
    text-align: left;
}
.item-me .info{
    background-color: rgb(77, 252, 8);
    color: rgb(7, 7, 7);
    margin-right: 10px;
}
.item-me .info::after{
    position: absolute;
    top: 50%;
    right: -4px;
    transform: translateY(-50%) rotateZ(-45deg);
    content: "";
    width: 10px;
    height: 10px;
    display: inline-block;
    border-top: none;
    border-right: none;
    border-radius: 2px;
    background-color: rgb(77, 252, 8);
}
.item .info::before{
    position: absolute;
    top: 50%;
    left: -5px;
    transform: translateY(-50%) rotateZ(45deg);
    content: "";
    width: 10px;
    height: 10px;
    display: inline-block;
    border-top: none;
    border-right: none;
    border-radius: 2px;
    background-color: #fff;
}
</style>
<style lang="scss" scoped>
.talkRoom{
    position: absolute;
    width: 100%;
    height: 100%;
    background: url('../assets/appBg.jpg') no-repeat center;
    background-size: cover;
    text-align: center;
    h1{
        text-align: center;
        color: rgb(255, 255, 255);
    }
    .showNum{
        margin-top: 20px;
        display: inline-block;
    }
    .input{
        width: 620px;
    }
    .msgWrap{
        margin-top: 5px;
        width: 620px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
            .btn{
            margin-top: 10px;
            width: 620px;
            text-align: right;
        }
    }
}
</style>



