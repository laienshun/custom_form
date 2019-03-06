export default {
  /* 基本信息 */
  type: 'formDetail',
  selected: false, // 是否选中当前组件

  /* 控件信息 */
  control: {
    name: '明细',
    icon: 'icon icon-detail',
  },

  /* 组件信息 */
  component: {
    title: '明细',
    placeholder: '增加明细',
    require: false,
    options: [], // 下拉相关选项参数
  },

  // 嵌套表单组件配置数组
  form: []
}
