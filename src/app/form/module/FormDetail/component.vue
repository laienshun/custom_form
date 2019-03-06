<template lang="html">
  <div class="custom_form_item form_detail">
    <div class="title_bar">
      <div class="name">
        <span>{{config.component.title}}：</span>
      </div>
    </div>
    <div class="form">
      <draggable class="drag_box" :options="options" v-model="config.form">
        <div class="drop" :key="index" v-for="(item, index) in config.form">
          <!-- 单行输入框 -->
          <oneLineInputComponent v-if="item.type === 'oneLineInput'"
            :config="item"
            @remove="remove(index)"
            @select="getConfig(index)">
          </oneLineInputComponent>

          <!-- 多行输入框 -->
          <moreLineInputComponent v-if="item.type === 'moreLineInput'"
            :config="item"
            @remove="remove(index)"
            @select="getConfig(index)">
          </moreLineInputComponent>

          <!-- 数字输入框 -->
          <numberInputComponent v-if="item.type === 'numberInput'"
            :config="item"
            @remove="remove(index)"
            @select="getConfig(index)">
          </numberInputComponent>

          <!-- 单选框 -->
          <oneSelectInputComponent v-if="item.type === 'oneSelectInput'"
            :config="item"
            @remove="remove(index)"
            @select="getConfig(index)">
          </oneSelectInputComponent>

          <!-- 多选框 -->
          <moreSelectInputComponent v-if="item.type === 'moreSelectInput'"
            :config="item"
            @remove="remove(index)"
            @select="getConfig(index)">
          </moreSelectInputComponent>

          <!-- 日期选择框 -->
          <dateSelectInputComponent v-if="item.type === 'dateSelectInput'"
            :config="item"
            @remove="remove(index)"
            @select="getConfig(index)">
          </dateSelectInputComponent>

          <!-- 日期区间 -->
          <dateRangeInputComponent v-if="item.type === 'dateRangeInput'"
            :config="item"
            @remove="remove(index)"
            @select="getConfig(index)">
          </dateRangeInputComponent>

          <!-- 图片 -->
          <imgSelectComponent v-if="item.type === 'imgSelect'"
            :config="item"
            @remove="remove(index)"
            @select="getConfig(index)">
          </imgSelectComponent>

          <!-- 附件 -->
          <attachmentSelectComponent v-if="item.type === 'attachmentSelect'"
            :config="item"
            @remove="remove(index)"
            @select="getConfig(index)">
          </attachmentSelectComponent>

          <!-- 说明文字 -->
          <explainTextComponent v-if="item.type === 'explainText'"
            :config="item"
            @remove="remove(index)"
            @select="getConfig(index)">
          </explainTextComponent>

          <!-- 金额 -->
          <moneyInputComponent v-if="item.type === 'moneyInput'"
            :config="item"
            @remove="remove(index)"
            @select="getConfig(index)">
          </moneyInputComponent>

          <!-- 联系人 -->
          <contactSelectComponent v-if="item.type === 'contactSelect'"
            :config="item"
            @remove="remove(index)"
            @select="getConfig(index)">
          </contactSelectComponent>

          <!-- 电话 -->
          <phoneInputComponent v-if="item.type === 'phoneInput'"
            :config="item"
            @remove="remove(index)"
            @select="getConfig(index)">
          </phoneInputComponent>

          <!-- 地点 -->
          <addressInputComponent v-if="item.type === 'addressInput'"
            :config="item"
            @remove="remove(index)"
            @select="getConfig(index)">
          </addressInputComponent>

          <!-- 明细 -->
          <formDetailComponent v-if="item.type === 'formDetail'"
            :config="item"
            @remove="remove(index)"
            @select="getConfig(index)"
            @selectChange="selectChange">
          </formDetailComponent>
        </div>
        <!-- 提示 -->
        <div class="placeholder" v-show="config.form.length === 0">可拖入多个组件，不包含明细组件</div>
      </draggable>
    </div>
    <div class="tips">
      <Icon type="md-add-circle" />
      <span class="">{{config.component.placeholder}}</span>
      <div :class="['lay_tip', {'active': config.selected}]" @click="select"><Icon type="ios-backspace" @click.stop="close" /></div>
    </div>
  </div>
</template>

<script>
const oneLineInputComponent = require('../oneLineInput').default.component
const moreLineInputComponent = require('../moreLineInput').default.component
const numberInputComponent = require('../numberInput').default.component
const oneSelectInputComponent = require('../oneSelectInput').default.component
const moreSelectInputComponent = require('../moreSelectInput').default.component
const dateSelectInputComponent = require('../dateSelectInput').default.component
const dateRangeInputComponent = require('../dateRangeInput').default.component
const imgSelectComponent = require('../imgSelect').default.component
const attachmentSelectComponent = require('../attachmentSelect').default.component
const explainTextComponent = require('../explainText').default.component
const moneyInputComponent = require('../moneyInput').default.component
const contactSelectComponent = require('../contactSelect').default.component
const phoneInputComponent = require('../phoneInput').default.component
const addressInputComponent = require('../addressInput').default.component

import config from './config'

export default {
  components: {
    oneLineInputComponent,
    moreLineInputComponent,
    numberInputComponent,
    oneSelectInputComponent,
    moreSelectInputComponent,
    dateSelectInputComponent,
    dateRangeInputComponent,
    imgSelectComponent,
    attachmentSelectComponent,
    explainTextComponent,
    moneyInputComponent,
    contactSelectComponent,
    phoneInputComponent,
    addressInputComponent
  },
  name: 'formDetailComponent',
  props: {
    config: {
      type: Object,
      default: function () {
        return {component: {}}
      }
    }
  },
  data () {
    return {
      options: {
        group: {
          name: 'formDetail',
          put: 'controlList',
          animation: 500,
          delay: 300
        }
      }
    }
  },
  watch: {
    'config.form.length' (newVal) {
      if (newVal === 0) { // 组件为空
        // 注册事件
        this.$emit('selectChange')
      }
      this.config.form.map((item, index) => {
        this.$set(this.config.form, index, this.$utils.copyObj(item))
      })
    }
  },
  methods: {
    close () { // 注册移除事件
      this.$emit('remove')
    },
    select () { // 点击选择当前组件
      this.config.form.map(item => {
        item.selected = false
      })
      this.$emit('select')
    },
    remove (index) { // 组件移除
      this.config.form.splice(index, 1)
      // 注册事件
      this.$emit('selectChange')
    },
    getConfig (index) { // 获取组件配置
      if (this.config.form[index].selected) { // 点击取消
        this.config.form[index].selected = false
        // 注册事件
        this.$emit('selectChange')
      } else {// 点击选择
        this.config.form.map(item => {
          item.selected = false
        })
        this.config.form[index].selected = true
        // 注册事件
        this.$emit('selectChange', this.config.form[index])
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/style/value.scss';
.title_bar {
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  color: #999;
  background: #fff;
  padding-left: 15px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #e1e1e1;
}
.custom_form_item {
  &.active {
    border: 1px solid #38adff;
  }
  .form {
    padding: 5px 0;
    .placeholder {
      height: 80px;
      line-height: 80px;
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
  .lay_tip {
    display: none;
  }
  .tips {
    font-size: 15px;
    color: $blue;
    padding-left: 15px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    background: #fff;
    border-bottom: 1px solid #c8c8ca;
    border-top: 1px solid #e1e1e1;
    i {
      font-size: 24px;
    }
    &:hover .lay_tip {
      display: block;
    }
  }
}
</style>

<style lang="scss">
  .form_detail {
    .drop {
      &:first-child {
        .input {
          border-top: none !important;
        }
      }
      .custom_form_item {
        margin-bottom: 0 !important;
      }
      .input {
        border-top-color: #e1e1e1 !important;
        border-bottom: none !important;
      }
    }
  }
</style>
