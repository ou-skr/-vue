<template>
  <div class="home">
      <el-container>
  <el-aside width="200px">
       <el-menu
      :unique-opened='true'
      :router='true'
      default-active="2"
      class="el-menu-vertical-demo"
 
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
          <el-menu-item index="/home/user">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户列表</span>
              </template>
            </el-menu-item>
      </el-submenu>
  
        <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
          <el-menu-item index="2-3">
             <template slot="title">
          <i class="el-icon-location"></i>
          <span>角色列表</span>
        </template>
          </el-menu-item>
          <el-menu-item index="2-4">
             <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户列表</span>
        </template>
          </el-menu-item>
      </el-submenu>

    </el-menu>
  </el-aside>
  <el-container>
    <el-header>
        <span class="myicon myicon-menu toggle-btn"></span>
        <h3 class="system-title">后台管理系统</h3>
        <div class="welcome">
        <span>你好:adamin</span>&nbsp;
        <a href="javascripts:;">退出</a>
        </div>
    </el-header>
    <el-main>
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height:60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292CF;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome{
    color: white;
  }
}
</style>
