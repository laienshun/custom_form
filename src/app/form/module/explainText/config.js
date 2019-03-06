export default {
  /* 基本信息 */
  type: 'explainText',
  selected: false, // 是否选中当前组件

  /* 控件信息 */
  control: {
    name: '说明文字',
    icon: 'icon icon-text_tip',
  },

  /* 组件信息 */
  component: {
    title: '说明文字',
    text: '请输入说明文字',
    placeholder: '',
    require: false,
    options: [] // 下拉相关选项参数
  }
}
