<template>
  <div class="add-main">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="浏览权限">
        <el-radio-group v-model="form.role">
          <el-radio label=",1,2," >管理员可见</el-radio>
          <el-radio label=",1,2,3," >所有人可见</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="数据类型" v-show="!form.id">
        <el-radio-group v-model="form.classid">
          <el-radio label="1" >质粒</el-radio>
          <el-radio label="2" >菌株</el-radio>
          <el-radio label="3" >文档</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="标签">
        <el-checkbox-group v-model="form.tagList">
          <el-checkbox v-for="item in tags" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
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
        <el-upload style="width: 600px;" :limit="1" :action="'/api/article/UploadImg'" :on-success="handleSuccess" :on-remove="handleRemove" list-type="picture" ref="pic">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传.jpg .jpeg .gif .png .bmp文件，且不超过5MB</div>
        </el-upload>
      </el-form-item>
      <el-form-item v-show="label.sequence[form.classid]" :label="label.sequence[form.classid]">
        <el-input type="textarea" v-model="form.sequence"></el-input>
      </el-form-item>
      <el-form-item v-show="label.filepath[form.classid]" :label="label.filepath[form.classid]">
        <el-upload style="width: 600px;" :limit="1" :action="'/api/article/UploadFile'" :on-success="fileSuccess" :on-remove="fileRemove" ref='file'>
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
        features: '',
        role: ',1,2,',
        tagList: []
      },
      tags: []
    }
  },
  watch: {
    $route (){
      if(!this.$toute){
        this.form = {
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
          features: '',
          role: ',1,2,',
          tagList: []
        }
      }
    }
  },
  created(){
    let myDate = new Date();
    this.form.createtime = myDate.getFullYear() + '-' + (myDate.getMonth()+1) + '-' + myDate.getDate();

    this.getAllTags();
    this.getArticle();
  },
  methods: {
    getAllTags() {
      let _this = this;
      this.ajax('/api/tags/getalltags', 'Get', '', function (res) {
          _this.tags = _this.tags.concat(res.data)
      });
    },
    errorMsg(msg){
      this.$message({
        type: 'error',
        message: msg || "保存失败！",
        duration: 1000
      });
    },
    yanzheng() {
      let f = this.form, la = this.label, cid = f.classid;

      if(!f.project) return '课题名称';
      if(!f.username) return la['username'][cid];
      if(!f.createtime) return la['createtime'][cid];
      if(!f.name) return la['name'][cid];
      if(cid == 1) {
        if(!f.resistance) return la['resistance'][cid];
        if(!f.temperature) return la['temperature'][cid];
        if(!f.copysequence) return la['copysequence'][cid];
        if(!f.method) return la['method'][cid];
        if(!f.sequence) return la['sequence'][cid];
      }
      if(cid == 2){
        if(!f.source) return la['source'][cid];
        if(!f.features) return la['features'][cid];
        if(!f.sequence) return la['sequence'][cid];
      }

      return false;
    },
    getArticle() {
      let aid = this.$route.query.aid, _this = this;
      if(!aid) return;
      this.ajax("/api/article/GetArticleByID/"+aid, 'Get', {}, function(res){
        if(res.data && res.data.length > 0) {
          let form = res.data[0], tagList = [];
          form.classid = form.classid + '';
          if(form.tags){
            let list = form.tags.split(',');
            list.length = list.length - 1;
            list.shift();
            list.forEach(item => {
              tagList.push(item*1);
            });
          }
          
          form.tagList = tagList;
          _this.form = form;
        }
      });
    },
    onSubmit() {
      let _this = this, eMsg = _this.yanzheng();
      if(eMsg) {
        this.errorMsg('请输入' + eMsg)
        return;
      }

      let tags = this.form.tagList.join(",");
      tags && (tags = "," + tags + ",");
      this.form.tags = tags;
      this.ajax("/api/article/"+(this.form.id?"UpdateArticle":"AddArticle"), 'Post', this.form, function(res){
        if(res.data){
          _this.$message({
            type: 'success',
            message: "保存成功！",
            duration: 1000
          });
          setTimeout(() => {
            !_this.form.id && location.reload();
          }, 1000);
          return;
        }
        _this.errorMsg();
      });
    },
    handleSuccess(response, file) {
      if(response.message){
        this.$refs.pic.clearFiles();
        this.$message.error(response.message);
        return;
      }
      this.form.picpath = response.data;
    },
    fileSuccess(response, file) {
      if(response.message){
        this.$refs.file.clearFiles();
        this.$message.error(response.message);
        return;
      }
      this.form.filepath = response.data;
    },
    handleRemove(file, fileList) {
      this.form.picpath = ''
    },
    fileRemove(file, fileList) {
      this.form.filepath = ''
    },
    ajax(url, type, para, success) {
      let _this = this;
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
<style>
.add-main{
  padding: 20px;
}
.el-textarea__inner{
  height: 200px;
}
</style>
