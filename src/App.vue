<template>
  <div id="admin-app">
    <el-header style="height: 77px; display: flex;">
      <img class="header-logo" src="./assets/image/logo.jpeg" alt="北京龙科方舟生物工程技术有限公司" /><p class="title">{{title}}</p>
    </el-header>
    <el-container style=" border: 1px solid #eee; background: #fff; min-height: 600px;">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '2', '3']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>资料管理</template>
          <el-menu-item-group>
            <el-menu-item index="1-2" @click="nav('management')">资料管理</el-menu-item>
            <el-menu-item index="1-1" @click="nav('add')">添加资料</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>标签管理</template>
          <el-menu-item-group>
            <el-menu-item index="2-1">添加标签</el-menu-item>
            <el-menu-item index="2-2">标签管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>用户管理</template>
          <el-menu-item-group>
            <el-menu-item index="3-1">添加用户</el-menu-item>
            <el-menu-item index="3-2">用户管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        </el-menu>
      </el-aside>

      <el-main style="min-height: 600px;">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: ''
    }
  },
  methods: {
    nav: function(navStr) {
        this.$router.push(navStr)
    }
  }
}
</script>
<style>
.el-menu-item-group__title{
  padding: 0;
}
.header-logo{
  margin-top: 6px;
  width: 60px;
  height: 60px;
}
.title{
  font-size: 30px;
  margin: 20px;
  color: #3f66c8;
}
</style>
