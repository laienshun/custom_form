<!-- 表单显示组件 -->
<template lang="html">
  <div class="preview">
    <div class="preview_main">
      <draggable class="drag_box" :options="options" @add="add" v-model="componentList">
        <div :key="index" v-for="(item, index) in componentList">

          <!-- 单行输入框 -->
          <oneLineInputComponent v-if="item.type === 'oneLineInput'"
            :config="item"
            @remove="remove(index)"
            @select="getConfig(index)">
          </oneLineInputComponent>

          <!-- 多行输入框 -->
          <moreLineInputComponent v-if="item.type === 'moreLineInput'"
            :config="item"
            @remove="remove(index)"
            @select="getConfig(index)">
          </moreLineInputComponent>

          <!-- 数字输入框 -->
          <numberInputComponent v-if="item.type === 'numberInput'"
            :config="item"
            @remove="remove(index)"
            @select="getConfig(index)">
          </numberInputComponent>

          <!-- 单选框 -->
          <oneSelectInputComponent v-if="item.type === 'oneSelectInput'"
            :config="item"
            @remove="remove(index)"
            @select="getConfig(index)">
          </oneSelectInputComponent>

          <!-- 多选框 -->
          <moreSelectInputComponent v-if="item.type === 'moreSelectInput'"
            :config="item"
            @remove="remove(index)"
            @select="getConfig(index)">
          </moreSelectInputComponent>

          <!-- 日期选择框 -->
          <dateSelectInputComponent v-if="item.type === 'dateSelectInput'"
            :config="item"
            @remove="remove(index)"
            @select="getConfig(index)">
          </dateSelectInputComponent>

          <!-- 日期区间 -->
          <dateRangeInputComponent v-if="item.type === 'dateRangeInput'"
            :config="item"
            @remove="remove(index)"
            @select="getConfig(index)">
          </dateRangeInputComponent>

          <!-- 图片 -->
          <imgSelectComponent v-if="item.type === 'imgSelect'"
            :config="item"
            @remove="remove(index)"
            @select="getConfig(index)">
          </imgSelectComponent>

          <!-- 附件 -->
          <attachmentSelectComponent v-if="item.type === 'attachmentSelect'"
            :config="item"
            @remove="remove(index)"
            @select="getConfig(index)">
          </attachmentSelectComponent>

          <!-- 说明文字 -->
          <explainTextComponent v-if="item.type === 'explainText'"
            :config="item"
            @remove="remove(index)"
            @select="getConfig(index)">
          </explainTextComponent>

          <!-- 金额 -->
          <moneyInputComponent v-if="item.type === 'moneyInput'"
            :config="item"
            @remove="remove(index)"
            @select="getConfig(index)">
          </moneyInputComponent>

          <!-- 联系人 -->
          <contactSelectComponent v-if="item.type === 'contactSelect'"
            :config="item"
            @remove="remove(index)"
            @select="getConfig(index)">
          </contactSelectComponent>

          <!-- 电话 -->
          <phoneInputComponent v-if="item.type === 'phoneInput'"
            :config="item"
            @remove="remove(index)"
            @select="getConfig(index)">
          </phoneInputComponent>

          <!-- 地点 -->
          <addressInputComponent v-if="item.type === 'addressInput'"
            :config="item"
            @remove="remove(index)"
            @select="getConfig(index)">
          </addressInputComponent>

          <!-- 明细 -->
          <formDetailComponent v-if="item.type === 'formDetail'"
            :config="item"
            @remove="remove(index)"
            @select="getConfig(index)"
            @selectChange="selectChange">
          </formDetailComponent>
        </div>
        <div class="tip" v-if="componentList.length === 0">
          <div class="">
            请从左侧拖动控件来创建表单
          </div>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import module from './module'

export default {
  components: module.componentList,
  data () {
    return {
      options: {
        group: {
          name: 'componentList',
          put: 'controlList',
          animation: 500,
          delay: 300
        }
      },
      componentList: []
    }
  },
  props: {
    components: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  watch: {
    'componentList.length' (newVal) {
      if (newVal === 0) { // 组件为空
        // 注册事件
        this.$emit('selectChange')
      }
      this.componentList.map((item, index) => {
        this.$set(this.componentList, index, this.$utils.copyObj(item))
      })
      // 注册事件
      this.$emit('change', this.componentList)
    },
    'components.length' () {
      this.componentList = this.components
    }
  },
  created () {

  },
  methods: {
    remove (index) { // 组件移除
      this.componentList.splice(index, 1)
      // 注册事件
      this.$emit('selectChange')
    },
    getConfig (index) { // 获取组件配置

      if (this.componentList[index].selected) { // 点击取消
        this.componentList[index].selected = false
        // 注册事件
        this.$emit('selectChange')
      } else {// 点击选择
        this.componentList.map(item => {
          item.selected = false
        })
        this.componentList[index].selected = true
        // 注册事件
        this.$emit('selectChange', this.componentList[index])
      }
    },
    // 明细组件事件冒泡
    selectChange (item) {
      // 注册事件
      this.$emit('selectChange', item)
    },
    add (obj) { // 组件添加后
      let index = obj.newIndex
      let time = ''
      if (this.componentList[index]) {
        this.getConfig(index)
      } else {
        // 轮询监听数据是否有更新
        time = setInterval(() => {
          if (this.componentList[index]) {
            this.getConfig(index)
            clearInterval(time)
          }

        }, 100)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/style/value.scss';
.preview {
  width: 421px;
  height: 766px;
  margin: 0 auto;
  background: url('../../assets/img/phone_wrap.png');
  background-size: cover;
  .preview_main {
    position: absolute;
    overflow-x: hidden;
    overflow-y: auto;
    left: 38px;
    top: 84px;
    right: 38px;
    bottom: 0;
    max-height: 548px;
    background: #f0eff4;
    padding-top: 15px;

    .tip {
      min-height: 300px;
      padding-top: 230px;
      text-align: center;
      font-size: 14px;
      color: #999;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPkAAAB4CAMAAAAHfaTfAAAAS1BMVEXw7/Tq6Ovd3OHLys+6ur3j4ufX1tnAv8Pu7fHPztLf3uOQj5Lo5uni4eTGxcjK6Ovp6Orq6N2Qj7C8npLp6OzT0dXIyMuQqs3au6IOHzIZAAABv0lEQVR42u3c3WqDMBiAYc2XH5NF121tt/u/0vl5NNENnApR3/eoCAUfTE0a0IqIiIiIiIiIiIiIiIiIiIgW5Uz5uWqHkjlCaXu4M+2t3rPWuKZaWeN2uOrGKHzHklH4WroxO8jrfdvmnJEjR44cOfIC5V58ai4pv8entd0jX0+uOd/Z8MgXlPfdfbCduaK8z4kNvjx5G0VqTbRFn2L7pzy75DXnmmBtLk4e5d9yib/JnZdgRz3Lu+Yiuf5nInPyxohSu+jdvRry1oZcnnzj33lSdog/Z3LTH0knv8M1Xsd4VOYYfvZ7u/Tu4JtqCj/1fJ4fOsz1tKfwMlcyIvUWd7hhnE8n7axHC129LpO/fby/zny17XqhTM9ZJ/JY6rp9C7kO9K6dOeeuP96cV26GgT63eo3Whnux/9WWyL9ehj5HX416wV09I3/28Fzu//O18lsYLvic3Mkzn2ZnYhjt41LXXmE3akZe3y6xD6dydiCPLl+1hkOO/GDyfFH5qn24Q8tX7b0eWn7dWQ05cuTIkSNHjhw5cuTIkSNHjhw5cuTIkSNHjhw5T2Hz5D1vWzjKGzaSq4iIiIiIiIiIqNy+AfuRKzxKIq3BAAAAAElFTkSuQmCC) no-repeat center;
    }

    .list_box {
      color: $blue;
      height: 2px;
      background: $blue;
      overflow: hidden;
      margin-bottom: 15px;
      // margin: 0;
    }

    // 表单相关
    .custom_form_item {
      position: relative;
      margin-bottom: 15px;
      // 输入框
      .input {
        position: relative;
        min-height: 48px;
        padding: 15px;
        background: #fff;
        border-top: 1px solid #c8c8ca;
        border-bottom: 1px solid #c8c8ca;
        font-size: 0;
        .name {
          display: inline-block;
          width: 100px;
          font-size: 16px;
          color: #333;
          margin-right: 10px;
          vertical-align: middle;
          .require {
            color: #ed4014;
            vertical-align: middle;
          }
        }
        .placeholder {
          display: inline-block;
          width: 180px;
          font-size: 14px;
          color: #ccc;
          vertical-align: middle;
          overflow: hidden;
        }
        .right_tip {
          display: inline-block;
          font-size: 14px;
          color: #ccc;
          position: absolute;
          top: 15px;
          right: 15px;
        }
      }
      // 遮罩层
      .lay_tip {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: move;
        i {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 24px;
          color: $blue;
          display: none;
          cursor: pointer;
        }
        &.active {
          border: 1px solid #38adff;
          display: block;
        }
        &:hover {
          border: 1px dashed #38adff;
          i {
            display: inline-block;
          }
        }
      }
    }
  }
  .drag_box {
    height: 100%;
  }
}
</style>
