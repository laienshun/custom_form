export default {
  /* 基本信息 */
  type: 'dateSelectInput',
  selected: false, // 是否选中当前组件

  /* 控件信息 */
  control: {
    name: '日期选择框',
    icon: 'icon icon-date',
  },

  /* 组件信息 */
  component: {
    title: '日期选择框',
    placeholder: '请选择',
    require: false,
    options: [], // 下拉相关选项参数
  }
}
