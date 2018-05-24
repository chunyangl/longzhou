<template>
  <div class="management-main">
    <div id="sreach">
      <el-select v-model="classid" placeholder="请选择分类" class="sel-w">
        <el-option v-for="(item,index) in classlist" :key="index" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="tagid" placeholder="请选择标签" class="sel-w">
        <el-option v-for="item in tags" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-input placeholder="请输入搜索内容" v-model="inputText" class="ipt-w" clearable></el-input>
      <el-button type="primary" icon="el-icon-search" id='search-btn'> 搜索&nbsp; &nbsp; </el-button>
  </div>
    <el-table :data="data" stripe style="width: 100%">
      <el-table-column prop="class" label="类型" width="100"></el-table-column>
      <el-table-column prop="project" label="课题名称" width="400"></el-table-column>
      <el-table-column prop="username" label="创建者" width="150"></el-table-column>
      <el-table-column prop="createtime" label="创建时间" width="150"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="Edit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="Delete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="page" background layout="total, prev, pager, next" @current-change="pageChange" :current-page='pageIndex' :page-size="pageSize" :total="total"></el-pagination>
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
        value: '0',
        label: '全部'
      }],
      classid: '',
      tagid: '',
      inputText: '',
      pageIndex: 1,
      pageSize: 5,
      total: 26,
      data: []
    }
  },
  methods: {
    Edit(index, row){
console.log(index, row);
    },
    Delete(index, row){
    },
    pageChange(val) {
      this.pageIndex = val;
      console.log('page: ' + val);
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
