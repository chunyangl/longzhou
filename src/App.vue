<template>
  <div id="admin-app">
    <el-header style="height: 77px; display: flex; justify-content: space-between;">
      <a href="/" target="_blank"><img class="header-logo" src="./assets/image/logo.jpeg" alt="北京龙科方舟生物工程技术有限公司" /><p class="title">{{title}}</p></a><a @click="unlogin" id='unlogin'>退出登录</a>
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
            <el-menu-item index="2-1" @click="nav('tagManage')">标签管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3" v-show="Role===1">
          <template slot="title"><i class="el-icon-setting"></i>用户管理</template>
          <el-menu-item-group>
            <el-menu-item index="3-1" @click="nav('adminmanagement')">用户管理</el-menu-item>
            <el-menu-item index="3-2" @click="nav('addadmin')">添加用户</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        </el-menu>
      </el-aside>

      <el-main style="min-height: 600px;  min-width: 1000px;">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '北京龙科方舟生物工程技术有限公司',
      usession: '',
      Role: 0
    }
  },
  created () {
    this.Role = ~~localStorage.getItem('r');
    this.usession = this.getCookie('usession');
    if(!this.usession) {
      alert('您没有登录或登录超时，请重新登录！');
      location.href="/admin/";
      return;
    }
  },
  methods: {
    ajax: function(url, type, para, success, error) {
      $.ajax({
        type: type,
        url: url,
        dataType: "json",
        data: para || {},
        success: function (result) {
          success && success(result);
        },
        error: function(e){
            error&&error();
        }
      });
    },
    unlogin: function(login){
      if(!this.usession) { location.href="/admin/"; return;}
      var _this = this;
      this.ajax('/api/admin/unLogin', 'Post', {}, function (res) {
        location.href="/";
      });
    },
    setCookie: function(e,t,n,r,i,a){var o=new Date;n&&(n=1e3*n*60*60*24);var s=new Date(o.getTime()+n);document.cookie=e+"="+escape(t)+(n?";expires="+s.toGMTString():"")+(r?";path="+r:"")+(i?";domain="+i:"")+(a?";secure":"")},
    getCookie: function(e){for(var t=document.cookie.split(";"),n="",r="",i=!1,a=0;a<t.length;a++){if(n=t[a].split("="),n[0].replace(/^\s+|\s+$/g,"")==e)return i=!0,n.length>1&&(r=unescape(n[1].replace(/^\s+|\s+$/g,""))),r;n=null,""}if(!i)return null},
    nav: function(navStr) {
        this.$router.push(navStr)
    }
  }
}
</script>
<style>
#unlogin{
  cursor: pointer;
  display: block;
  margin-top: 32px;
}
.el-menu{
  height: 100%;
}
.el-menu-item-group__title{
  padding: 0;
}
.header-logo{
  margin-top: 16px;
  width: 40px;
  height: 40px;
  float: left;
}
.title{
  font-size: 26px;
  margin: 24px 0 0 10px;
  color: #3f66c8;
  float: left;
}
</style>
