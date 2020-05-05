<template>
    <div class="login-container">
        <el-form :model="userInfo" label-width="100px" :rules="rules" status-icon  ref="userInfo" style="width:400px">
            <el-form-item label="用户名" prop="userCount">
                <el-input v-model="userInfo.userCount"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="userInfo.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label-width="150px">
                <el-button type="primary" @click="onSubmit('userInfo')">登录</el-button>
                <el-button @click="resetForm()">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator';
@Component({})
export default class Login extends Vue {
        public userInfo={
                userCount:"201616030237",
                password:"123456"
        }
        rules={
            userCount:[{ required: true, message: '请输入用户名', trigger: 'blur' }],
            password:[{required: true, message: '请输入密码', trigger: 'blur'}]
        }
        async onSubmit(userInfo:any){
            this.$refs[userInfo].validate((valid:any) => {
                if (valid) {
                    this.$http.post("/login",this.userInfo).then(res=>{
                        if(res.data.code=="400"){
                            this.$message({
                                type:'error',
                                message:"用户名或密码错误"
                            })
                        }else{
                            window.localStorage.setItem('userCount',JSON.stringify(res.data.userName))
                            this.$store.state.userName=JSON.stringify(res.data.userName)
                             this.$message({
                                 type:'success',
                                 message:"登录成功"
                             })
                             this.$router.push('/home')
                        }
                    })
                   
                } else {
                    return false;
                }
            });
        }
        resetForm(){
            this.userInfo.userCount="";
            this.userInfo.password="";
        }
};
</script>


<style lang="scss" scoped>
body{
    margin: 0;
}
    .login-container{
        box-sizing:border-box;
        position: absolute;
        width: 100%;
        height: 100%;
        display: inline-block;
        background:url('../assets/bg.jpg') no-repeat center;
        background-size:cover;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
