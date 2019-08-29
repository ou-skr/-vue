<template>
  <div class="login">
    <div class="container">
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-loginForm"
      >
        <img src="../assets/avatar.jpg" class="avatar" alt />
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" prefix-icon="myicon myicon-user" value="admin"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" prefix-icon="myicon myicon-key" value="123456"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="login-btn" @click="login">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>


<script>

//因为需要发送请求，所以使用axios 把已经封装好的login登陆函数方法引入
//users.js相当于一个对象，里面的封装每一个函数都是一个属性，相当于从对象里拿一个值，是对象的结构
import {login} from '@/api/users.js'

export default {
  data: function() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        name: [
          //required必须填 message 提示信息 trigger触发
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          //required必须填 message 提示信息 trigger触发
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    login() {
      //实现用户的数据验证，因为rules只是提示信息，不能阻止用户登陆请求
      //表单登陆， 表单登陆有个validate函数，这个函数可以真正实现用户表单元素验证规则的对应
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          //验证通过
        //验证通过才允许发请求
        login(this.loginForm)
        .then(res=>{
            // eslint-disable-next-line no-console
            if(res.data.meta.status===400){
                this.$message({
                    message:res.data.meta.msg,
                    tpe:'error'
                })
            }else{
                //路由跳转
                //用编程式导航进行路由的跳转
                this.$router.push({name:'Home'})
            }
        })
        .catch(err=>{
            // eslint-disable-next-line no-console
            console.log(err)
            this.$message({
                message:'服务器错误',
                type:'error'
            })
        })
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
        } else {
            //验证不通过
          this.$message({
          message: '警告哦，这是一条警告消息',
          type: 'warning'
        });
            return false//一定要return false
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
