export default {
  /* 基本信息 */
  type: 'moneyInput',
  selected: false, // 是否选中当前组件

  /* 控件信息 */
  control: {
    name: '金额',
    icon: 'icon icon-money',
  },

  /* 组件信息 */
  component: {
    title: '金额（元）',
    placeholder: '请输入',
    require: false,
    options: [], // 下拉相关选项参数
  }
}
