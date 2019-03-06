<template lang="html">
  <div class="form">
    <Form>
      <FormItem label="说明文字(最多200字)：" prop="">
        <Input type="textarea" :autosize="{minRows: 5,maxRows: 8}" v-model="config.component.text"></Input>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  name: 'explainTextSetup',
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
