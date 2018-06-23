<template>
  <div class="add-main">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户角色">
        <el-radio-group v-model="form.Role">
          <el-radio label="3" >普通员工</el-radio>
          <el-radio label="2" >管理员</el-radio>
        </el-radio-group>
      </el-form-item>
      
      <el-form-item label="姓名">
        <el-input clearable v-model="form.Name" style="width:200px;" :span="11"></el-input>
      </el-form-item>
      <el-form-item label="登录名">
        <el-input clearable v-model="form.Username" style="width:200px;" :span="11"></el-input>
      </el-form-item>
      <el-form-item label="登录密码">
        <el-input type="password" clearable v-model="form.Password" style="width:200px;" :span="11"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input type="password" clearable v-model="form.qrpassword" style="width:200px;" :span="11"></el-input>
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
      form: {
        Role: '3',
        Name: '',
        Username:'',
        Password:'',
        qrpassword:''
      }
    }
  },
  watch: {
    $route (){
      if(!this.$toute){
        this.resetData();
      }
    }
  },
  created(){
    this.getAdmin();
  },
  methods: {
    resetData(){
      this.form = {
        Role: '3',
        Name: '',
        Username:'',
        Password:'',
        qrpassword:''
      }
    },
    errorMsg(msg){
      this.$message({
        type: 'error',
        message: msg || "保存失败！",
        duration: 1000
      });
    },
    getAdmin() {
      let aid = this.$route.query.aid, _this = this;
      if(!aid) return;
      this.ajax("/api/admin/GetAdminInfoByid", 'Post', { id: aid}, function(res){
        if(res.data) {
          let form = res.data;
          form.Role = form.Role+"";
          _this.form = form;
        }
      });
    },
    yanzheng() {
      let f = this.form, la = this.label, cid = f.classid;

      if(!f.Name) return '请输入用户姓名';
      if(!f.Username) return "请输入登录名";
      if(!f.Password) return "请输入密码";
      if(f.Password!==f.qrpassword) return "密码与确认密码不一致";
      return false;
    },
    onSubmit() {
      let _this = this, eMsg = _this.yanzheng();
      if(eMsg) {
        this.errorMsg(eMsg)
        return;
      }

      this.ajax("/api/admin/"+(this.form.id?"UpdateAdmin":"AddAdmin"), 'Post', this.form, function(res){
        if(res.data){
          _this.$message({
            type: 'success',
            message: "保存成功！",
            duration: 1000
          });
          setTimeout(() => {
            !_this.form.id && _this.resetData();
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
