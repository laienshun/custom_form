<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view>
      </router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import './assets/style/value.scss';
  #app {
    height: 100%;
    margin: 0 auto;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.2s ease;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  // 头部
  $height: 60px;
  .header_wrap {
    height: $height;
    .header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: $height;
      line-height: $height;
      background: #fff;
      border-bottom: 1px solid #e1e1e1;
      padding: 0 30px;
      .left {
        float: left;
        height: $height;
        line-height: $height;
        color: #333;
        text-align: center;
        cursor: pointer;
        i {
          font-size: 28px;
          color: #666;
        }
      }
      .right {
        position: absolute;
        top: 0;
        right: 30px;
        height: $height;
        button {
          margin-left: 10px;
        }
      }
      .header_main {
        text-align: center;
        font-size: 0;
        .header_list {
          display: inline-block;
          height: $height;
          padding: 0 50px;
          line-height: $height;
          font-size: 18px;
          color: #333;
          text-align: center;
          // cursor: pointer;
          box-sizing: border-box;
          &:hover, &.active {
            // color: #fff;
            // background: rgb(84, 170, 251);
          }
        }
      }
    }
  }
</style>
