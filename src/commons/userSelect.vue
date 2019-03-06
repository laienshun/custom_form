<template lang="html">
  <div class="">
    <Modal :styles="{top: '100px'}" :closable="false" :mask-closable="false" v-model="show" width="700">
      <p slot="header" style="color:#333;text-align:center">
          {{title}}
      </p>
      <div class="user_select t_clear">
        <div class="left">
          <div class="title">
            <span>选择：</span>
          </div>
          <div class="main_content">
            <!-- 搜索条 -->
            <!-- <div class="search_wrap">
              <Icon type="ios-search" class="search_icon"/>
              <input type="text" placeholder="搜索">
            </div> -->
            <!-- 地图导航 -->
            <Collapse v-model="Panel">
                <Panel name="1">
                    部门
                    <!-- 选择列表 -->
                    <div class="select_wrap" slot="content">
                      <div class="select_list" @click="changeCheck(item)" v-for="item in selectData.departments">
                        <Icon type="ios-square-outline" v-show="!item.selected" class="select_icon"/>
                        <Icon type="md-checkbox" v-show="item.selected" class="select_icon active"/>
                        <i class="icon icon-department group_icon"></i>
                        <span class="name">{{item.Name}}</span>
                      </div>
                    </div>
                </Panel>
                <Panel name="2">
                    角色
                    <div class="select_wrap" slot="content">
                      <div class="select_list" @click="changeCheck(item)" v-for="item in selectData.roles">
                        <Icon type="ios-square-outline" v-show="!item.selected" class="select_icon"/>
                        <Icon type="md-checkbox" v-show="item.selected" class="select_icon active"/>
                        <i class="icon icon-role group_icon"></i>
                        <span class="name">{{item.Name}}</span>
                      </div>
                    </div>
                </Panel>
                <Panel name="3">
                  用户
                  <div class="select_wrap" slot="content">
                    <div class="select_list" @click="changeCheck(item)" v-for="item in selectData.users">
                      <Icon type="ios-square-outline" v-show="!item.selected" class="select_icon"/>
                      <Icon type="md-checkbox" v-show="item.selected" class="select_icon active"/>
                      <i class="icon icon-user group_icon"></i>
                      <span class="name">{{item.Name}}</span>
                    </div>
                  </div>
                </Panel>
            </Collapse>
          </div>
        </div>
        <div class="right">
          <div class="title">
            <span>已选：</span>
          </div>
          <div class="main_content">
            <!-- 已选择列表 -->
            <div class="selected_list" v-for="(item, index) in selectedData">
              <i class="icon icon-department group_icon" v-if="item.Type === 1"></i>
              <i class="icon icon-role group_icon" v-if="item.Type === 2"></i>
              <i class="icon icon-user group_icon" v-if="item.Type === 3"></i>
              <span class="name">{{item.Name}}</span>
              <Icon type="ios-close-circle-outline" class="btn_close" @click="remove(index)"/>
            </div>
          </div>
        </div>
      </div>
      <div class="btn_area t_center" slot="footer">
        <Button type="default" size="large" @click="cancel" style="margin-right: 10px;">取消</Button>
        <Button type="primary" size="large" @click="ok">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: this.value,
      Panel: '',
      originalData: {
        departments: [],
        roles: [],
        users: []
      }, // 保存的原始数据
      selectData: {}, // 待选择数据
      selectedData: this.$utils.copyObj(this.baseData), // 已选择的数组
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '以下部门和人员可看到审批模板'
    },
    baseData: { // 已选择的数组
      type: Array,
      default: function () {
        return []
      }
    }
  },
  watch: {
    value (val) {
      this.show = val
    },
    show (val) {
      // 重置数据
      this.resetData()

      this.$emit('input', val)
    }
  },
  created () {
    this.resetData()
    this.getAuthSelectList()
  },
  methods: {
    resetData () { // 重置数据
      // 重置选择数据
      this.selectData = this.$utils.copyObj(this.originalData)
      // 设置默认已选数据
      if (this.baseData.length > 0) {
        this.selectedData = this.$utils.copyObj(this.baseData)
        // 激活选择状态
        this.Panel = []
        this.selectedData.map(item => {
          switch (item.Type) {
            case 1:
              this.Panel.push('1')
              this.selectData.departments.map(department => {
                if (department.TID === item.TID) {
                  department.selected = true
                }
              })
              break;
            case 2:
              this.Panel.push('2')
              this.selectData.roles.map(role => {
                if (role.TID === item.TID) {
                  role.selected = true
                }
              })
              break;
            case 3:
              this.Panel.push('3')
              this.selectData.users.map(user => {
                if (user.TID === item.TID) {
                  user.selected = true
                }
              })
              break;
          }
        })
      } else {
        this.selectedData = []
      }

    },
    getAuthSelectList () { // 获取权限选择列表
      this.$api.mainApi.getAuthSelectList().then(res => {
        this.resolveData(res.results)
      })
    },
    resolveData (data) { // 初始化数据
      // 筛选数据
      data.map(item => {
        item.selected = false
        switch (item.Type) {
          case 1: // 部门
            this.selectData.departments.push(item)
            break
          case 2: //角色
            this.selectData.roles.push(item)
            break
          case 3: // 用户
            this.selectData.users.push(item)
            break
        }
      })
      // copy一份原始数据
      this.originalData = this.$utils.copyObj(this.selectData)
    },
    changeCheck (item) { // 点击选择或取消选择操作
      if (!item.selected) { // 选择
        item.selected = true
        this.selectedData.push({
          Type: item.Type,
          TID: item.TID,
          Name: item.Name
        })
      } else { // 取消选择
        item.selected = false
        this.selectedData.map((data, index) => {
          if (data.Type === item.Type && data.TID === item.TID) {
            this.selectedData.splice(index, 1)
          }
        })
      }
    },
    remove (index) { // 移除已选
      let item = this.selectedData[index]
      switch (item.Type) {
        case 1:
          this.selectData.departments.map(department => {
            if (department.TID === item.TID) {
              department.selected = false
            }
          })
          break;
        case 2:
          this.selectData.roles.map(role => {
            if (role.TID === item.TID) {
              role.selected = false
            }
          })
          break;
        case 3:
          this.selectData.users.map(user => {
            if (user.TID === item.TID) {
              user.selected = false
            }
          })
          break;
      }
      this.selectedData.splice(index, 1)
    },
    search (keyword) { // 关键字检索
      keyword = keyword.replace(/ /g, '')
      if (keyword === undefined || keyword === '') {
        return
      }
    },
    ok () {
      this.show = false
      this.$emit('on-ok', this.selectedData)
    },
    cancel () {
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/style/value.scss";
.user_select {
  padding: 20px 10px;
  .left, .right {
    float: left;
    width: 50%;
    padding: 0 10px;
    .title {
      font-size: 16px;
      color: #333;
      margin-bottom: 10px;
    }
  }
  .left .main_content {
    border: none;
    background: #fff;
  }
  .main_content {
    border: 1px solid #dedede;
    border-radius: 4px;
    background: #f7f7f7;
    height: 400px;
    padding: 10px;
    overflow-y: auto;
    // 搜索框
    .search_wrap {
      position: relative;
      height: 34px;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding-left: 40px;
      margin-bottom: 10px;
      .search_icon {
        position: absolute;
        left: 0;
        top: 0;
        width: 40px;
        height: 34px;
        line-height: 32px;
        text-align: center;
        font-size: 18px;
        color: #666;
      }
      input {
        display: block;
        height: 32px;
        line-height: 34px;
        font-size: 12px;
        color: #333;
        border: none;
        &:focus {
          outline: none;
        }
      }
    }
    // 选择列表
    .select_wrap {
      max-height: 230px;
      overflow-y: auto;
      .select_list {
        margin-bottom: 5px;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        .select_icon {
          font-size: 18px;
          color: #666;
          margin-right: 5px;
          vertical-align: middle;
          &.active {
            color: $blue;
          }
        }
        .group_icon {
          font-size: 28px;
          color: $blue;
          vertical-align: middle;
        }
        .name {
          font-size: 14px;
          color: #333;
          vertical-align: middle;
        }
      }
    }
    // 已选择列表
    .selected_list {
      margin-bottom: 5px;
      height: 30px;
      line-height: 30px;
      .group_icon {
        font-size: 28px;
        color: $blue;
        vertical-align: middle;
      }
      .name {
        font-size: 14px;
        color: #333;
        vertical-align: middle;
      }
      .btn_close {
        float: right;
        font-size: 22px;
        color: #999;
        cursor: pointer;
      }
    }
  }
}
</style>
