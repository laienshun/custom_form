export default {
  /* 基本信息 */
  type: 'imgSelect',
  selected: false, // 是否选中当前组件

  /* 控件信息 */
  control: {
    name: '图片',
    icon: 'icon icon-image',
  },

  /* 组件信息 */
  component: {
    title: '图片',
    placeholder: '',
    require: false,
    options: [] // 下拉相关选项参数
  }
}
