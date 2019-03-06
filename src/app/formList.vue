<template lang="html">
  <div class="form_list">
    <div class="title">
      <span>表单列表</span>
      <span class="add" @click="skip({name: 'formAdd'})">新增表单</span>
    </div>
    <div class="list_wrap">
      <div class="list" v-for="item in formList">
        <img :src="item.cover" class="cover">
        <div class="name">
          <span>{{item.formName}}</span>
          <span class="category">{{item.formClassName}}</span>
        </div>
        <div class="desc">
          {{item.desc}}
        </div>
        <div class="btn_area">
          <a href="javascript:;" class="btn" @click="skip({name: 'formEdit', params: {id: item.ID}})">编辑</a>
          <a href="javascript:;" class="btn" @click="delForm(item.ID)">删除</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formList: [],
      params: {
        Page: 1,
        ShowCount: 100
      }
    }
  },
  created () {
    this.getFormList()
  },
  methods: {
    getFormList () {
      this.$api.mainApi.getFormList(this.params).then(res => {
        this.formList = res.results
        this.formList.map(item => {
          item.cover = this.$config.iconList[item.iconIndex]
        })
      })
    },
    delForm (id) {
      this.$Modal.confirm({
        title: '提示',
        content: '是否删除该表单',
        onOk: () => {
          this.$api.mainApi.delForm({ID: id}).then(res => {
            this.$Message.success('删除成功')
            this.getFormList()
          })
        }
      })
    },
    skip (router) {
      this.$router.push(router)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/style/value";
.form_list {
  width: $min-width;
  margin: 0 auto;
  margin-top: 30px;
  background: #fff;
  padding: 50px 200px;
  .title {
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    color: #333;
    border-left: 2px solid $blue;
    margin-bottom: 50px;
    padding-left: 10px;
    font-weight: 600;
    .add {
      font-size: 16px;
      color: $blue;
      float: right;
      font-weight: 600;
      cursor: pointer;
    }
  }
  .list_wrap {
    padding: 0;
    font-size: 0;
    .list {
      position: relative;
      display: inline-block;
      width: 48%;
      height: 90px;
      padding: 15px;
      padding-left: 100px;
      padding-right: 100px;
      border: 1px solid #e1e1e1;
      margin-bottom: 20px;
      margin-right: 2%;
      .cover {
        position: absolute;
        top: 15px;
        left: 15px;
        width: 60px;
        height: 60px;
      }
      .name {
        font-size: 16px;
        line-height: 1;
        color: #333;
        margin-bottom: 10px;
        font-weight: 600;
        .category {
          font-size: 14px;
          line-height: 1;
          display: inline-block;
          padding: 4px 8px;
          color: #fff;
          background: $blue;
          border-radius: 4px;
          margin-left: 10px;
          vertical-align: middle;
          font-weight: 400;
        }
      }
      .desc {
        font-size: 14px;
        color: #999;
        line-height: 1.5;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .btn_area {
        position: absolute;
        top: 15px;
        right: 20px;
        a {
          font-size: 14px;
          color: $blue;
          margin: 0 5px;
          &:hover {
            color: $blue;
          }
        }
      }
    }
  }
}
</style>
