<template lang="html">
  <div class="custom_form_item">
    <div class="input">
      <div class="name">
        <span class="require" v-show="config.component.require">*</span>
        <span>{{config.component.title}}</span>
      </div>
      <div class="placeholder">
        {{config.component.placeholder}}
      </div>
    </div>
    <div :class="['lay_tip', {'active': config.selected}]" @click="select"><Icon type="ios-backspace" @click.stop="close" /></div>
  </div>
</template>

<script>
import config from './config'
export default {
  name: 'moreLineInputComponent',
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

    }
  },
  methods: {
    close () { // 注册移除事件
      this.$emit('remove')
    },
    select () { // 点击选择当前组件
      this.$emit('select')
    }
  }
}
</script>

<style lang="scss" scoped>
.custom_form_item {
  .input {
    padding-bottom: 40px !important;
  }
}
</style>
