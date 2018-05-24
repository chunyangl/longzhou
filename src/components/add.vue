<template>
  <div class="add-main">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="数据类型">
        <el-radio-group v-model="form.classid">
          <el-radio label="1" >质粒</el-radio>
          <el-radio label="2" >菌株</el-radio>
          <el-radio label="3" >文档</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="课题名称">
        <el-input v-model="form.project" style="width:600px;" :span="11"></el-input>
      </el-form-item>
      <el-form-item :label="label.username[form.classid]">
        <el-input v-model="form.username" style="width:200px;" :span="11"></el-input>
      </el-form-item>
      <el-form-item :label="label.createtime[form.classid]">
        <el-col :span="11">
          <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="form.createtime" style="width: 200px;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item :label="label.name[form.classid]">
        <el-input v-model="form.name" style="width:600px;" :span="11"></el-input>
      </el-form-item>
      <el-form-item v-show="label.source[form.classid]" :label="label.source[form.classid]">
        <el-input v-model="form.source" style="width:200px;" :span="11"></el-input>
      </el-form-item>
      <el-form-item v-show="label.features[form.classid]" :label="label.features[form.classid]">
        <el-input v-model="form.features" style="width:600px;" :span="11"></el-input>
      </el-form-item>
      
      <el-form-item v-show="label.resistance[form.classid]" label="抗性">
        <el-input v-model="form.resistance" style="width:200px;" :span="11"></el-input>
      </el-form-item>
      <el-form-item v-show="label.temperature[form.classid]" label="培养温度">
        <el-input v-model="form.temperature" style="width:200px;" :span="11"></el-input>
      </el-form-item>
      <el-form-item v-show="label.copysequence[form.classid]" label="复制序列">
        <el-input v-model="form.copysequence" style="width:200px;" :span="11"></el-input>
      </el-form-item>
      <el-form-item v-show="label.method[form.classid]" label="构建方法">
        <el-input v-model="form.method" style="width:600px;" :span="11"></el-input>
      </el-form-item>
      <el-form-item v-show="label.picpath[form.classid]" :label="label.picpath[form.classid]">
        <el-upload style="width: 600px;" :limit="1" :action="domain + '/api/article/UploadImg'" :on-success="handleSuccess"  :on-remove="handleRemove"  list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传.jpg .jpeg .gif .png .bmp文件，且不超过5MB</div>
        </el-upload>
      </el-form-item>
      <el-form-item v-show="label.sequence[form.classid]" :label="label.sequence[form.classid]">
        <el-input type="textarea" v-model="form.sequence"></el-input>
      </el-form-item>
      <el-form-item v-show="label.filepath[form.classid]" :label="label.filepath[form.classid]">
        <el-upload style="width: 600px;" :limit="1" :action="domain + '/api/article/UploadFile'" :on-success="fileSuccess"  :on-remove="fileRemove">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">可上传.rar .zip .docx .xlsx .txt .pptx .pdf .jpg .jpeg .gif .png .bmp文件，不超过5MB</div>
        </el-upload>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保 存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      domain: 'http://localhost:8088',
      label: {
        username: {'1':'构建者', '2':'分离者', '3':'作者'},
        createtime: {'1':'构建时间', '2':'分离时间', '3':'创建时间'},
        name: {'1':'质粒名称', '2':'菌株名称', '3':'文档标题'},
        resistance: {'1':'抗性'},
        temperature: {'1':'培养温度'},
        copysequence: {'1':'复制序列'},
        method: {'1':'构建方法'},
        picpath: {'1':'图谱', '2':'显微照片'},
        sequence: {'1':'序列', '2':'序列'},
        filepath: {'3':'附件'},
        source: {'2':'来源'},
        features: {'2':'菌株特性'}
      },
      form: {
        classid: '1',
        project: '',
        username: '',
        createtime: '',
        name: '',
        resistance: '',
        temperature: '',
        copysequence: '',
        method: '',
        picpath: '',
        sequence: '',
        filepath: '',
        source: '',
        features: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.form);
      $.ajax({
        type: "Post",
        beforeSend: function (xhr) {
          //xhr.setRequestHeader("X-JSON-RPC", "updateAtag");
        },
        url: this.domain + "/api/article/AddArticle",
        dataType: "json",
        data: this.form,
        success: function (result) {
          console.log('res',result);
        },
        error: function (e) {
          console.log('error',e);
        }
    });
    },
    handleSuccess(response, file) {
      console.log('suc', response);
      if(response.message){
        this.$message.error(response.message);
        return;
      }
      this.form.picpath = response.data;
    },
    fileSuccess(response, file) {
      console.log('suc', response);
      if(response.message){
        this.$message.error(response.message);
        return;
      }
      this.filepath = response.data;
    },
    handleRemove(file, fileList) {
      this.form.picpath = ''
    },
    fileRemove(file, fileList) {
      this.filepath = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.add-main{
  padding: 20px;
}
.el-textarea__inner{
  height: 200px;
}
</style>
