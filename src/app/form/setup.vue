<!-- 设置组件 -->
<template lang="html">
  <div class="setup">
    <Tabs :value="active">
        <TabPane label="控件设置" name="1">
          <!-- 单行输入框 -->
          <oneLineInputSetup :config="config" v-if="config.type === 'oneLineInput'"></oneLineInputSetup>

          <!-- 多行输入框 -->
          <moreLineInputSetup :config="config" v-if="config.type === 'moreLineInput'"></moreLineInputSetup>

          <!-- 数字输入框 -->
          <numberInputSetup :config="config" v-if="config.type === 'numberInput'"></numberInputSetup>

          <!-- 单选框 -->
          <oneSelectInputSetup :config="config" v-if="config.type === 'oneSelectInput'"></oneSelectInputSetup>

          <!-- 多选框 -->
          <moreSelectInputSetup :config="config" v-if="config.type === 'moreSelectInput'"></moreSelectInputSetup>

          <!-- 日期选择框 -->
          <dateSelectInputSetup :config="config" v-if="config.type === 'dateSelectInput'"></dateSelectInputSetup>

          <!-- 日期范围 -->
          <dateRangeInputSetup :config="config" v-if="config.type === 'dateRangeInput'"></dateRangeInputSetup>

          <!-- 图片 -->
          <imgSelectSetup :config="config" v-if="config.type === 'imgSelect'"></imgSelectSetup>

          <!-- 说明文字 -->
          <explainTextSetup :config="config" v-if="config.type === 'explainText'"></explainTextSetup>

          <!-- 附件 -->
          <attachmentSelectSetup :config="config" v-if="config.type === 'attachmentSelect'"></attachmentSelectSetup>

          <!-- 金额 -->
          <moneyInputSetup :config="config" v-if="config.type === 'moneyInput'"></moneyInputSetup>

          <!-- 联系人 -->
          <contactSelectSetup :config="config" v-if="config.type === 'contactSelect'"></contactSelectSetup>

          <!-- 电话 -->
          <phoneInputSetup :config="config" v-if="config.type === 'phoneInput'"></phoneInputSetup>

          <!-- 地址 -->
          <addressInputSetup :config="config" v-if="config.type === 'addressInput'"></addressInputSetup>

          <!-- 地址 -->
          <formDetailSetup :config="config" v-if="config.type === 'formDetail'"></formDetailSetup>
        </TabPane>
        <TabPane label="基本设置" name="2">
          <Form class="form_setup">
            <FormItem label="* 表单名称：" prop="">
              <Input placeholder="请输入表单标题" v-model="formConfig.formName"></Input>
            </FormItem>
            <FormItem label="* 分类：" prop="">
              <Select placeholder="请选择分类" v-model="formConfig.formClass">
                <Option :value="item.ID" v-for="(item, index) in classList" :key="index">{{item.Name}}</Option>
              </Select>
              <span class="btn_add" @click="showAddClass">新增分类</span>
            </FormItem>
            <FormItem label="* 谁可以发起这表单：" prop="">
              <div class="select_input" @click="selectInititor">
                <span v-show="formAuthData.List.length === 0">请选择用户</span>
                <span v-show="formAuthData.List.length > 0">{{dealFormAuthData}}</span>
              </div>
            </FormItem>
            <FormItem label="* 图标：" prop="">
              <div class="icon_wrap">
                <img :src="iconList[iconIndex]" v-if="iconIndex >= 0" class="icon">
                <Icon type="md-add-circle" class="add" @click="openIconSelect"/>
              </div>
            </FormItem>
            <FormItem label="表单说明：" prop="">
              <Input type="textarea" :autosize="{minRows: 5,maxRows: 8}" v-model="formConfig.desc" placeholder="请输入描述..."></Input>
            </FormItem>
          </Form>
        </TabPane>
        <TabPane label="审批" name="3">
          <div class="approve_wrap">
            <div v-for="(item, index) in approveData.List">
              <div class="approve_list">
                <div class="approve_list_top">
                  <span>审批人</span>
                  <Icon type="md-close" class="btn_close" @click="removeApprover(index)"/>
                </div>
                <div class="approve_list_content" @click="selectApprover(item, index)">
                  <span v-show="item.length === 0">请选择审批人</span>
                  <span v-show="item.length > 0">{{item|dealApproveData}}</span>
                  <Icon type="ios-arrow-forward" class="right_icon"/>
                </div>
              </div>
              <div class="node_wrap">
                <button class="btn_add2" type="button" @click="addApprover(index)">
                  <Icon type="md-add" />
                </button>
              </div>
            </div>
            <Button type="primary" v-show="approveData.List.length === 0" @click="addApprover">添加审批人</Button>
          </div>
        </TabPane>
    </Tabs>

    <!-- 图标选择组件 -->
    <Modal title="图标选择" :styles="{top: '100px'}" v-model="showIconSelect" @on-ok="selectIconHandle">
      <p slot="header" style="color:#333;text-align:center">
          图标选择
      </p>
      <div class="icon-select">
        <div :class="['list', {'current': index === currentIndex}]" @click="selectIcon(index)" v-for="(item, index) in iconList">
          <img :src="item">
          <Icon type="md-checkmark-circle" class="icon1"/>
          <div class="cover"></div>
        </div>
      </div>
    </Modal>

    <!-- 用户选择组件 -->
    <userSelect v-model="showUserSelect" @on-ok="selectedCallback" :baseData="defaultData"></userSelect>

    <!-- 新增分类 -->
    <Modal title="新增分类" :styles="{top: '100px'}" v-model="showClassAddModal" width="400">
      <p slot="header" style="color:#333;text-align:center">
          新增分类
      </p>
      <p slot="footer" style="text-align:center">
          <Button type="primary" size="large" @click="addClass">添加</Button>
      </p>
      <div class="">
        <Input v-model="classParams.Name" placeholder="请输入分类名称"/>
      </div>
    </Modal>
  </div>
</template>

<script>
import module from './module'
import userSelect from '@/commons/userSelect'
module.setupList.userSelect = userSelect
export default {
  components: module.setupList,
  props: {
    config: {
      type: Object,
      default: function () {
        return {component: {}}
      }
    },
    active: {
      type: String,
      default: '2'
    },
    formConfig: {
      type: Object,
      default: function () {
        return {}
      }
    },
    formAuthData: { // 表单发起权限数据
      type: Object,
      default: function () {
        return {
          FTID: '',
          List: []
        }
      }
    },
    approveData: { // 表单审批流程数据
      type: Object,
      default: function () {
        return {
          FTID: '',
          List: []
        }
      }
    },
  },
  watch: {
    'formConfig.formName' () {
      this.getFormConfig()
    },
    'formConfig.formClass' () {
      this.getFormConfig()
    },
    'formConfig.iconIndex' (val) {
      this.iconIndex = val
      this.formConfig.iconIndex = this.iconIndex
      this.getFormConfig()
    },
    'formConfig.desc' () {
      this.getFormConfig()
    },
    'approveData.List' () {
      this.$emit('getFormApprove', this.approveData)
    }
  },
  data () {
    return {
      isSave: false, // 是否执行保存动作
      // 图标选择
      showIconSelect: false,
      iconList: this.$config.iconList,
      currentIndex: '',
      iconIndex: -1,
      classParams: {
        ID: '',
        Name : ''
      },
      classList: [],
      showClassAddModal: false,
      /* 审批人相关 */

      /* 选择用户相关操作 */
      showUserSelect: false, // 显示用户选择框
      defaultData: [], // 默认的用户选择数据
      approveDataIndex: '', // 当前选择的index
      type: '', // 返回的已选择数据所属type，是发起人initiator还是审批人approver
    }
  },
  created () {
    this.getClassList()
  },
  filters: {
    dealApproveData (data) {
      let arr = []
      data.map(item => {
        arr.push(item.Name)
      })
      return arr.join(',')
    }
  },
  computed: {
    dealFormAuthData () { // 表单权限数据转换
      let arr = []
      this.formAuthData.List.map(item => {
        arr.push(item.Name)
      })
      return arr.join(',')
    }
  },
  methods: {
    openIconSelect () { // 打开图标弹窗
      this.showIconSelect = true
      this.currentIndex = this.iconIndex
    },
    selectIcon (index) { // 点击选择图标
      this.currentIndex = index
    },
    selectIconHandle () { // 确认选择
      this.iconIndex = this.currentIndex
      this.formConfig.iconIndex = this.iconIndex
      this.getFormConfig()
    },
    getFormConfig () { // 获取表单基本设置
      this.$emit('getFormConfig', this.formConfig)
    },
    getClassList () { // 获取分类列表
      this.$api.mainApi.getClassList().then(res => {
        this.classList = res.results
      })
    },
    showAddClass () { // 显示新增分类modal
      this.classParams.Name = ''
      this.showClassAddModal = true
    },
    addClass () { // 新增分类
      if (!this.classParams.Name) {
        this.$Message.warning('分类名字不能为空')
        return
      }
      this.$api.mainApi.editClass(this.classParams).then(res => {
        this.showClassAddModal = false
        this.$Message.success('新增成功')
        this.getClassList()
      })
    },
    /* 用户选择相关 */
    selectInititor () { // 选择表单权限
      this.showUserSelect = true
      // 设置当前用户选择所属类型
      this.type = 'initiator'
      // 设置默认选择数据
      this.defaultData = this.formAuthData.List
    },
    selectApprover (item, index) { // 选择表单人
      this.showUserSelect = true
      // 设置当前用户选择所属类型
      this.type = 'approver'
      // 设置默认选择数据
      this.defaultData = item
      this.approveDataIndex = index
    },
    selectedCallback (data) { // 已选择回调
      if (this.type === 'approver') {
        this.approveData.List[this.approveDataIndex] = data
        this.$emit('getFormApprove', this.approveData)
      }
      if (this.type === 'initiator') {
        this.formAuthData.List = data
        this.$emit('getFormAuth', this.formAuthData)
      }
    },
    addApprover (index) { // 添加审批人
      if (index !== undefined) {
        this.approveData.List.splice(index + 1, 0, [])
      } else {
        this.approveData.List.push([])
      }
    },
    removeApprover (index) { // 移除审批人
      this.approveData.List.splice(index, 1)
    },

    /* 请求操作 */
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/value";

.setup {
  padding-left: 76px;
  .option_list {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  // 表单设置
  .form_setup {
    .icon_wrap {
      .icon {
        width: 40px;
        height: 40px;
        vertical-align: middle;
        border-radius: 40px;
      }
      .add {
        font-size: 40px;
        color: #c1c1c1;
        cursor: pointer;
      }
    }
  }
  .btn_add {
    color: $blue;
    cursor: pointer;
    float: right;
  }
}

// 图标选择
.icon-select {
  min-height: 300px;
  .list {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 50px;
    font-size: 0;
    margin-right: 5px;
    margin-left: 5px;
    margin-bottom: 10px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
    .icon1 {
      display: none;
      position: absolute;
      top: -10px;
      right: -10px;
      font-size: 20px;
      color: #2d8cf0;
      background: #fff;
      border-radius: 20px;
    }
    .cover {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.4);
    }
    &.current {
      .icon1 {
        display: block;
      }
      .cover {
        display: none;
      }
    }
  }
}

.select_input {
  display: inline-block;
  width: 100%;
  min-height: 32px;
  line-height: 1.5;
  padding: 4px 7px;
  font-size: 14px;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  color: #999;
  background-color: #fff;
  background-image: none;
  position: relative;
  cursor: pointer;
}

// 审批
.approve_wrap {
  text-align: center;
  height: 600px;
  overflow-y: auto;
  .approve_list {
    width: 220px;
    border-radius: 4px;
    background: #fff;
    display: inline-block;
    .approve_list_top {
      height: 24px;
      line-height: 24px;
      padding: 0 10px;
      font-size: 14px;
      color: #fff;
      background: #ff943e;
      .btn_close {
        font-size: 14px;
        line-height: 24px;
        float: right;
        cursor: pointer;
      }
    }
    .approve_list_content {
      position: relative;
      font-size: 14px;
      line-height: 1.5;
      padding: 16px;
      padding-right: 30px;
      cursor: pointer;
      .right_icon {
        position: absolute;
        top: 50%;
        right: 0;
        width: 30px;
        font-size: 16px;
        color: #999;
        text-align: center;
        margin-top: -8px;
      }
    }
  }
  .node_wrap {
    position: relative;
    display: inline-block;
    width: 240px;
    padding: 20px 0 32px;
    text-align: center;
    .btn_add2 {
      outline: none;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
      width: 30px;
      height: 30px;
      background: #3296fa;
      border-radius: 50%;
      position: relative;
      border: none;
      line-height: 28px;
      cursor: pointer;
      i {
        font-size: 22px;
        color: #fff;
      }
    }
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      margin: auto;
      width: 2px;
      height: 100%;
      background-color: #cacaca;
    }
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
      width: 0;
      height: 4px;
      border-style: solid;
      border-width: 8px 6px 4px;
      border-color: #cacaca transparent transparent;
      background: #f5f5f7;
    }
  }
}
</style>

<style lang="scss">
</style>
