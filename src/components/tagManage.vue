<template>
  <div class="management-main">
    <div id="sreach" class="mb15">
      <el-input placeholder="请输入标签名称" v-model="tagName" class="ipt-w" clearable></el-input>
      <el-button type="primary" icon="el-icon-edit" @click="addtag" id='search-btn'> 添加标签&nbsp; &nbsp; </el-button>
    </div>
    <div >
      <el-button class="mb15" plain  icon="el-icon-delete" v-for="item in tags" :key="item.id" @click="Delete(item.id)">{{item.name}}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tagName: '',
      tags: []
    }
  },
  created (){
    this.getAllTags();
  },
  methods: {
    errorMsg(msg){
      this.$message({
        type: 'error',
        message: msg || "保存失败！",
        duration: 1000
      });
    },
    addtag(page){
      let _this = this, existence = false;

      if(this.tagName === "") {
        this.errorMsg("请输入标签名称");
        return;
      }

      this.tags.forEach(item => {
        if(item.name == this.tagName) {
          existence = true;
        }
      });

      if(existence) {
        this.errorMsg("标签名称已存在");
        return;
      }

      this.ajax('/api/tags/AddTag', 'Post', {name: this.tagName}, function (res) {
        if(res.data){
          _this.getAllTags();
          _this.tagName = '';
        }
      });
    },
    Delete(id){
      let _this = this;
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.ajax('/api/tags/DeleteTagByID/'+id, 'Get', '', function (res) {
          _this.getAllTags()
          _this.$message({
            type: 'success',
            message: "删除成功",
            duration: 1000
          });
        });
      });
    },
    getAllTags() {
      let _this = this;
      this.ajax('/api/tags/getalltags', 'Get', '', function (res) {
          _this.tags = res.data
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
.mb15{
  margin-bottom: 15px;;
}
.ipt-w{
  width:200px;
  margin-right: 20px;
}
</style>
