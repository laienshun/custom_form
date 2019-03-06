export default {
  /* 基本信息 */
  type: 'contactSelect',
  selected: false, // 是否选中当前组件

  /* 控件信息 */
  control: {
    name: '联系人',
    icon: 'icon icon-contact',
  },

  /* 组件信息 */
  component: {
    title: '联系人',
    placeholder: '请选择',
    require: false,
    options: [
      {
        name: '选项一'
      }, {
        name: '选项二'
      }, {
        name: '选项三'
      }
    ], // 下拉相关选项参数
  }
}
