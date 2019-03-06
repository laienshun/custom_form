<template lang="html">
  <div class="custom_form_item">
    <div class="input">
      <div class="name">
        <span class="require" v-show="config.component.require">*</span>
        <span>{{config.component.title}}</span>
      </div>
      <div class="right_tip">
        <span>{{config.component.placeholder}}</span>
        <Icon type="ios-arrow-forward" />
      </div>
    </div>
    <div :class="['lay_tip', {'active': config.selected}]" @click="select"><Icon type="ios-backspace" @click.stop="close" /></div>
  </div>
</template>

<script>
import config from './config'
export default {
  name: 'oneSelectInputComponent',
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

<style lang="css">
</style>
