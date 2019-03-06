<!-- 控件库 -->
<template lang="html">
  <div class="control">
    <Tabs value="1">
        <TabPane label="控件库" name="1">
          <div class="list_wrap">
            <draggable v-model="controlList" :options="options">
              <div class="list_box" :key="index" v-for="(item, index) in controlList">
                <div class="list" >
                  <span>{{item.control.name}}</span>
                  <i :class="item.control.icon"></i>
                </div>
              </div>
            </draggable>
          </div>
        </TabPane>
    </Tabs>
  </div>
</template>

<script>
import module from './module'
export default {
  data () {
    return {
      options: {
        group: {
          name: 'controlList',
          pull: 'clone',
          revertClone: true,
        },
        sort: false
      },
      controlList: module.configList,
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
/* 控件库样式 */
.control {
  width: 350px;
  .list_wrap {
    padding-top: 15px;
    font-size: 0;
    .list_box {
      display: inline-block;
    }
    .list {
      border: 1px dashed #d1d1d1;
      margin: 0 7.5px 15px 7.5px;
      width: 160px;
      height: 42px;
      float: left;
      font-size: 14px;
      line-height: 42px;
      text-align: left;
      padding-left: 15px;
      cursor: move;
      color: #333;
      background: #fff;
      position: relative;
      overflow: hidden;
      i {
        position: absolute;
        right: 10px;
        top: 0px;
        font-size: 22px;
        color: #999;
      }
      &:nth-child(2n) {
        margin-right: 0;
      }
      &:hover {
        background: #f1f1f1;
      }
    }
  }
}
</style>
