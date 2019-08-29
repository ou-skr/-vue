<template>
  <div class="users">
      <el-breadcrumb 
      class="center"
      separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  <el-breadcrumb-item>活动详情</el-breadcrumb-item>
</el-breadcrumb>
<!-- input框 -->
<div style="margin-top: 15px; ">
  <el-input placeholder="请输入内容" v-model="userkey" class="input-with-select" style="width:300px">
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
    <el-button type="success" round @click='dialogFormVisible=true'>添加用户</el-button>
    
</div>
<!-- table表格 -->
  <el-table
    :data="userList"
    border
    style="width: 100%">
     <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="username"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="180">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="电话">
    </el-table-column> 
<!-- switch开关 -->
<el-table-column label="状态" width="80">
<template slot-scope="scope">
<el-switch
  v-model="value2"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>
</template>
</el-table-column>


<!-- 编辑修改 -->
      <el-table-column label="操作">
      <template slot-scope="scope">
    <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
       <el-button type="primary"  size="mini" icon="el-icon-edit" @click="handleEdit(scope)"></el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="分配角色" placement="top-start">
       <el-button type="success"  size="mini" icon="el-icon-share" @click="handleEdit(scope)"></el-button>
        </el-tooltip>
         <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
       <el-button type="danger"  size="mini" icon="el-icon-delete" @click="handleEdit(scope)"></el-button>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
<!-- 分页组件 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total-0">
    </el-pagination>

    <!-- 弹出对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
  <el-form :model="addForm" :rules='rules' ref="addForm">
    <!-- :label-width="'120px'"的120px也是一个匿名变量 -->
    <el-form-item label="用户名" :label-width="'120px'" prop="username">
      <el-input v-model="addForm.username" auto-complete="off" ></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="'120px'" prop="password">
      <el-input v-model="addForm.password" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" :label-width="'120px'" prop="email">
      <el-input v-model="addForm.email" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="手机号" :label-width="'120px'" prop="mobile">
      <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </div>
</el-dialog>
  </div>

  
</template>

<script>
import {getAllList,addUserList} from '@/api/users.js'
export default {
  data:function(){
    return{
      // 定义添加用户数据
      addForm:{
        username:'',
        password:'',
        email:'',
        mobile:''
      },
      // dialogFormVisible是对话框的显示隐藏
      dialogFormVisible:false,
      total:'',
      value2:true,
    query: '',
      //   当前页码
      pagenum: 1,
      //   每页显示的记录数
      pagesize: 2,
      userkey:'',
      userList: [],
            rules: {
        username: [
          //required必须填 message 提示信息 trigger触发
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          //required必须填 message 提示信息 trigger触发
          { required: true, message: "请输入密码", trigger: "blur" },
          {min:6,max:16,message:'输入长度不合适',trigger:'blur'}
        ],
        email:[
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {message: "请输入合法邮箱",pattern:/\w+[@]\w+[.]+/,trigger:'blur'}
        ],
        mobile:[
         {required: true, message: "请输入邮箱", trigger: "blur"} ,
          {message: "请输入合法手机号",pattern:/^1\d{10}$/,trigger:'blur'}
        ]
      }
    }
  },
  methods:{
    handleEdit:function(obj){
      // eslint-disable-next-line no-console
      console.log(obj)
    },
    // 切换每页显示记录数 
    handleSizeChange:function(val){
      // eslint-disable-next-line no-console
      console.log(`每页${val}条,5555`)
      this.pagesize=val
      this.init()
    },
    handleCurrentChange:function(val){
      // eslint-disable-next-line no-console
      console.log(`当前页${val}数`)
      this.pagenum=val
      this.init()
    },
    addUser:function(){
      this.$refs.addForm.validate(valid=>{
        if(valid){
          // eslint-disable-next-line no-console
          // console.log('ok')
          addUserList(this.addForm)
          .then(res=>{
            // eslint-disable-next-line no-console
            console.log(res)
            if(res.data.meta.status===201){
              this.$message({
                message:res.data.meta.msg,
                type:'success'
              })
              this.dialogFormVisible=false;
              this.init()
            }else{
                  this.$message({
                message:res.data.meta.msg,
                type:'error'
              })
              return false//axios阻止执行都是reuturn false ajax的beforesend阻止执行也是return false
            }
          })
        }
      })
    },
    init:function(){
      getAllList({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
    .then(res=>{
      // eslint-disable-next-line no-console
      console.log(res)
      this.userList=res.data.data.users
      this.total=res.data.data.total
    })
    }
  },
  mounted:function(){
    this.init()
  }
}
</script>

<style lang="less">
.center{
 display: flex;
 align-items: center;
}
</style>