export default {
  /* 基本信息 */
  type: 'attachmentSelect',
  selected: false, // 是否选中当前组件

  /* 控件信息 */
  control: {
    name: '附件',
    icon: 'icon icon-attachment',
  },

  /* 组件信息 */
  component: {
    title: '附件',
    placeholder: '',
    require: false,
    options: [] // 下拉相关选项参数
  }
}
