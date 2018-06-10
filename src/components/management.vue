<template>
  <div class="management-main">
    <div id="sreach">
      <el-select v-model="classid" placeholder="请选择分类" class="sel-w">
        <el-option v-for="(item,index) in classlist" :key="index" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="tagid" placeholder="请选择标签" class="sel-w">
        <el-option v-for="item in tags" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <el-input placeholder="请输入搜索内容" v-model="inputText" class="ipt-w" clearable @keyup.enter.native="search(1)"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="search(1)" id='search-btn'> 搜索&nbsp; &nbsp; </el-button>
  </div>
    <el-table :data="data" stripe style="width: 100%">
      <el-table-column prop="className" label="类型" width="100"></el-table-column>
      <el-table-column label="课题名称" width="400">
        <template slot-scope="scope">
          <a target="_blank" :href="'/details.html?aid='+scope.row.id">{{scope.row.project}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="创建者" width="150"></el-table-column>
      <el-table-column prop="createtime" label="创建时间" width="150"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-show="(Role==1||Role==2)||scope.row.createname == u" size="mini" @click="Edit(scope.$index, scope.row)">修改</el-button>
          <el-button v-show="(Role==1||Role==2)||scope.row.createname == u" size="mini" type="danger" @click="Delete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-show="total" class="page" background layout="total, prev, pager, next" @current-change="pageChange" :current-page='pageIndex' :page-size="pageSize" :total="total"></el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      classlist: [{
        value: '0',
        label: '全部'
      },{
        value: '1',
        label: '质粒'
      },{
        value: '2',
        label: '菌株'
      },{
        value: '3',
        label: '文档'
      }],
      tags: [{
        id: '0',
        name: '全部'
      }],
      classid: '',
      tagid: '',
      inputText: '',
      pageIndex: 1,
      pageSize: 20,
      total: 0,
      data: [],
      Role: 0,
      u: 0
    }
  },
  created (){
    this.Role = ~~localStorage.getItem('r');
    this.u = ~~localStorage.getItem('u');
    this.getAllTags();
    this.search();
  },
  methods: {
    getClassName(id, _this){
      if(id) {
        return _this.classlist.find(item => item.value==id).label;
      }
    },
    search(page){
      let _this = this;
      page && (_this.pageIndex = page)
      this.ajax('/api/article/SrearchArticle', 'Post', {
        ClassID: this.classid || 0,
        TagID: this.tagid || 0,
        PageIndex: this.pageIndex,
        PageSize: this.pageSize,
        Project: this.inputText || ''
      }, function (res) {
        if(res.data.ItemCount === 0){
          _this.$message({message:'未搜索到数据！',duration: 1000, type: 'warning'});
          return;
        }
        let List = res.data.List;
        List.forEach(item => {
          item.className = _this.getClassName(item.classid,_this);
          return item;
        });
        _this.data = List;
        _this.total = res.data.ItemCount
      });
    },
    Edit(index, row){
      this.$router.push({path:'/add',query:{aid:row.id}});
    },
    Delete(index, row){
      let _this = this;
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.ajax('/api/article/DeleteArticleByID/'+row.id, 'Get', '', function (res) {
            if(res.action === 'redirect') {
              _this.$message({
                type: 'success',
                message: "您没有删除权限或登录超时请登录后重试！",
                duration: 3000
              });
              return;
            }
            _this.search()
            _this.$message({
              type: 'success',
              message: "删除成功",
              duration: 1000
            });
          });
        });
    },
    pageChange(val) {
      this.search(val)
    },
    getAllTags() {
      let _this = this;
      this.ajax('/api/tags/getalltags', 'Get', '', function (res) {
          _this.tags = _this.tags.concat(res.data)
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
.page{
  margin-top: 15px;
}
.sel-w{
  width: 140px;
  margin-right: 20px;
}
.ipt-w{
  width:477px;
  margin-right: 20px;
}
</style>
