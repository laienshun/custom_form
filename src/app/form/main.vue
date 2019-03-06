<template lang="html">
  <div class="form_container">
    <!-- 头部 -->
    <div class="header_wrap">
      <div class="header">
        <div class="left" @click="$router.back()">
          <Icon type="md-arrow-back" />
        </div>
        <div class="header_main">
          <div class="header_list">
            <span>{{title}}</span>
          </div>
        </div>
        <div class="right">
          <!-- <Button>预览</Button> -->
          <Button type="primary" @click="save">保存</Button>
        </div>
      </div>
    </div>

    <!-- 主要内容 -->
    <div class="form_main">
      <Row>
        <!-- 控件库 -->
        <Col span="8">
          <control></control>
        </Col>

        <!-- 表单控件显示 -->
        <Col span="8">
          <preview @selectChange="selectChange" :components="formInfo.components" @change="change"></preview>
        </Col>

        <!-- 设置 -->
        <Col span="8">
          <setup :config="setupConfig" :active="setupActive" :formConfig="formBaseConfig"
          :formAuthData="formAuth"
          :approveData="formApprove"
          @getFormConfig="formConfigChange"
          @getFormAuth="formAuthChange" @getFormApprove="formApproveChange"></setup>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import preview from './preview'
import control from './control'
import setup from './setup'

export default {
  components: {
    preview,
    control,
    setup
  },
  data () {
    return {
      setupConfig: {component: {}}, // 当前组件配置
      setupActive: '2', // 菜单激活
      title: '新增表单',
      componentList: [],
      formConfig: {}, // 表单配置
      formInfo: {}, // 表单详情
      formBaseConfig: {}, // 表单基本设置
      formAuth: {
        FTID: 0,
        List: []
      }, // 表单权限数据
      formApprove: {
        FTID: 0,
        List: []
      }, // 表单审批数据
    }
  },
  created () {
    if (this.$route.name === 'formEdit') {
      this.title = '编辑表单'

      this.getFormInfo()
      this.getFormAuth()
      this.getFormApprove()
    }
  },
  methods: {
    selectChange (config) { // 点击组件改变
      this.setupActive = ''
      if (config) {
        this.setupActive = '1'
        this.setupConfig = config
      } else {
        this.setupActive = '2'
        this.setupConfig = {component: {}}
      }
    },
    change (componentList) { // 表单组件改变时
      this.componentList = componentList
    },
    formConfigChange (config) { // 表单基本配置改变时
      this.formConfig = config
    },
    formAuthChange (data) { // 表单发起权限改变时
      this.formAuth = data
    },
    formApproveChange (data) { // 表单审批人改变时
      this.formApprove = data
    },
    getFormInfo () { // 获取表单详情
      this.$api.mainApi.getFormDetail({ID: parseInt(this.$route.params.id)}).then(res => {
        this.formInfo = res.result
        this.formInfo.components = JSON.parse(this.formInfo.components.replace(/\\/g, ''))
        this.formBaseConfig = this.$utils.copyObj(this.formInfo)
        delete this.formBaseConfig.components
      })
    },
    getFormAuth () { // 获取表单权限
      this.$api.mainApi.loadFormAuth({FTID: parseInt(this.$route.params.id)}).then(res => {
        this.formAuth.List = res.results
      })
    },
    getFormApprove () { // 获取表单审批人
      this.$api.mainApi.loadFormApprove({FTID: parseInt(this.$route.params.id)}).then(res => {
        this.formApprove.List = res.results
      })
    },
    save () { // 保存表单
      let data = this.$utils.copyObj(this.formConfig)
      data.ID = data.ID || 0
      // 验证表单基本必填信息
      if (this.componentList.length === 0) {
        this.$Message.warning('请添加表单组件')
        return
      }
      data.components = JSON.stringify(this.componentList)
      if (!data.formName) {
        this.$Message.warning('请输入表单名')
        return
      }
      if (!data.formClass) {
        this.$Message.warning('请选择表单分类')
        return
      }
      if (!data.iconIndex) {
        this.$Message.warning('请选择表单图标')
        return
      }
      // 验证表单发起权限
      if (this.formAuth.List.length === 0) {
        this.$Message.warning('请选择谁可以发起该表单')
        return
      }
      // 验证表单审批
      if (this.formApprove.List.length === 0) {
        this.$Message.warning('请添加审批人')
        return
      }
      let pass = true
      this.formApprove.List.map(item => {
        if (item.length === 0) {
          pass = false
        }
      })
      if (!pass) {
        this.$Message.warning('请完善选择审批人信息')
        return
      }

      // 保存表单基本信息
      this.$api.mainApi.editForm(data).then(res => {
        this.formAuth.FTID = res.result
        this.formApprove.FTID = res.result
        // 保存表单发起权限
        return this.$api.mainApi.saveFormAuth(this.formAuth)
      }).then(res => {
        // 保存表单审批人
        return this.$api.mainApi.saveFormApprove(this.formApprove)
      }).then(res => {
        this.$Message.success(data.ID ? '修改成功' : '新增成功')
        this.$router.back()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/value";

.form_container {

  // 主要内容
  .form_main {
    width: $min-width;
    margin: 0 auto;
    padding-top: 50px;
  }
}
</style>


<style lang="scss">
  @import "../../assets/style/value";
  .form_container {

  }
</style>
