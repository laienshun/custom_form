<template lang="html">
  <div class="form">
    <Form>
      <FormItem label="标题(最多20字)：" prop="">
        <Input placeholder="请输入标题" :maxlength="20" v-model="config.component.title"></Input>
      </FormItem>
      <FormItem label="必填验证：" prop="">
        <i-switch size="large" v-model="config.component.require">
          <span slot="open">开</span>
          <span slot="close">关</span>
        </i-switch>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  name: 'attachmentSelectSetup',
  props: {
    config: {
      type: Object,
      default: function () {
        return {component: {}}
      }
    }
  },
  methods: {
    addOptions (options) {
      options.push({
        name: ''
      })
    },
    removeOptions (options, index) {
      options.splice(index, 1)
    }
  }
}
</script>

<style lang="css">
</style>
