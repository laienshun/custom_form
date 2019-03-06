<template lang="html">
  <div class="form">
    <Form>
      <FormItem label="标题(最多20字)：" prop="">
        <Input placeholder="请输入标题" :maxlength="20" v-model="config.component.title"></Input>
      </FormItem>
      <FormItem label="提示文字(最多50字)：" prop="">
        <Input type="textarea" :maxlength="50" :autosize="{minRows: 3,maxRows: 5}" v-model="config.component.placeholder" placeholder="请输入描述..."></Input>
      </FormItem>
      <FormItem label="选项(最多20个选项)：" prop="">
        <div class="option_list" :key="index" v-for="(item, index) in config.component.options">
          <Row>
            <Col span="16">
              <Input placeholder="请输入选项文字" :maxlength="20" v-model="item.name"></Input>
            </Col>
            <Col span="8" class="t_center">
              <Button icon="md-remove" type="primary" @click.native="removeOptions(config.component.options, index)"></Button>
              <Button icon="md-add" type="primary" @click.native="addOptions(config.component.options)"></Button>
            </Col>
        </Row>
        </div>
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
  name: 'oneLineInputSetup',
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
