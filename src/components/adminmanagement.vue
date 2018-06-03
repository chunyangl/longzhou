<template>
  <div class="management-main">
    <el-table :data="data" stripe style="width: 100%">
      <el-table-column prop="rolename" label="角色" width="100"></el-table-column>
      <el-table-column prop="name" label="姓名" width="150"></el-table-column>
      <el-table-column prop="username" label="登录名" width="150"></el-table-column>
      <el-table-column prop="date" label="创建日期" width="150"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" v-show="scope.row.id!==1" @click="Edit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" v-show="scope.row.id!==1" type="danger" @click="Delete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      roles: ['', '超级管理员', '管理员', '普通员工'],
      data: []
    }
  },
  created (){
    this.search();
  },
  methods: {
    search(){
      let _this = this;
      this.ajax('/api/admin/GetAllAdmin', 'Post', {}, function (res) {
        if(res.data.ItemCount === 0){
          _this.$message({message:'无用户数据！',duration: 1000, type: 'warning'});
          return;
        }
        let List = res.data, date = '';
        List.forEach(item => {
          item.rolename = _this.roles[item.role];
          date = new Date(item.createdate);
          item.date = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
          return item;
        });
        _this.data = List;
      });
    },
    Edit(index, row){
      this.$router.push({path:'/addadmin',query:{aid:row.id}});
    },
    Delete(index, row){
      let _this = this;
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.ajax('/api/admin/DeleteAdminByID/'+row.id, 'Get', '', function (res) {
            _this.search()
            _this.$message({
              type: 'success',
              message: "删除成功",
              duration: 1000
            });
          });
        });
    },
    ajax(url, type, para, success) {
      $.ajax({
        type: type,
        url: url,
        dataType: "json",
        data: para || {},
        success: function (result) {
          success && success(result);
        },
        error: function (e) {
          console.log('error',e);
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
