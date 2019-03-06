<template lang="html">
  <div class="form">
    <Form>
      <FormItem label="标题(最多20字)：" prop="">
        <Input placeholder="请输入标题" :maxlength="20" v-model="config.component.title"></Input>
      </FormItem>
      <FormItem label="提示文字(最多50字)：" prop="">
        <Input type="textarea" :maxlength="50" :autosize="{minRows: 3,maxRows: 5}" v-model="config.component.placeholder" placeholder="请输入描述..."></Input>
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
  name: 'moneyInputSetup',
  props: {
    config: {
      type: Object,
      default: function () {
        return {component: {}}
      }
    }
  }
}
</script>

<style lang="css">
</style>
