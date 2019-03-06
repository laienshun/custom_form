export default {
  /* 基本信息 */
  type: 'phoneInput',
  selected: false, // 是否选中当前组件

  /* 控件信息 */
  control: {
    name: '电话',
    icon: 'icon icon-phone',
  },

  /* 组件信息 */
  component: {
    title: '电话',
    placeholder: '130xxxxxxxx',
    require: false,
    options: [], // 下拉相关选项参数
  }
}
