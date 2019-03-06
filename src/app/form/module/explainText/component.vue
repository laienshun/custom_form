<template lang="html">
  <div class="custom_form_item">
    <div class="text">
      {{config.component.text}}
    </div>
    <div :class="['lay_tip', {'active': config.selected}]" @click="select"><Icon type="ios-backspace" @click.stop="close" /></div>
  </div>
</template>

<script>
import config from './config'
export default {
  name: 'explainTextComponent',
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
  .text {
    font-size: 14px;
    color: #858e99;
    padding: 15px;
    padding-bottom: 30px;
    line-height: 1.5;
    background: #fff;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
}
</style>
