export default {
  /* 基本信息 */
  type: 'addressInput',
  selected: false, // 是否选中当前组件

  /* 控件信息 */
  control: {
    name: '地点',
    icon: 'icon icon-local',
  },

  /* 组件信息 */
  component: {
    title: '地点',
    placeholder: '例如：广州市天河区元岗路',
    require: false,
    options: [], // 下拉相关选项参数
  }
}
