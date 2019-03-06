export default {
  /* 基本信息 */
  type: 'dateRangeInput',
  selected: false, // 是否选中当前组件

  /* 控件信息 */
  control: {
    name: '日期区间',
    icon: 'icon icon-date_range',
  },

  /* 组件信息 */
  component: {
    title: '开始时间',
    title2: '结束时间',
    placeholder: '请选择',
    require: false,
    options: [], // 下拉相关选项参数
  }
}
