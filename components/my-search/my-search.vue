<template>
  <view class="my-search-container" :style="{'background-color': bgColor}" @click="searchBoxHandler">
    <!-- 使用view组件模拟 input 输入框的样式 -->
    <view class="my-search-box" :style="{'border-radius': radius + 'px'}">
      <!-- 使用uni-ui提供的图标组件 -->
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    // 通过props定义两个属性，运行使用者自定义修改
    props: {
      // 背景颜色
      bgColor: {
        type: String,
        default: '#7c67fb'
      },
      // 圆角尺寸
      radius: {
        type: Number,
        default: 18 //px
      }
    },
    name:"my-search",
    data() {
      return {
        
      };
    },
    methods:{
      // 点击模拟input的输入框
      searchBoxHandler() {
        // 触发外界通过 @click 绑定的 click 事件处理函数
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
.my-search-container{
    // 移除背景颜色，改由 props 属性控制
    // background-color: #C00000;
    height: 50px;
    display: flex;
    align-items: center;// 纵向居中
    padding: 0 10px;// 上下和左右与边界的间隔

    .my-search-box{
      height: 36px;
      background-color: #FFFFFF;
      // 移除圆角尺寸，改由 props 属性控制
      // border-radius: 15px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .placeholder{
        font-size: 15px;
        margin-left: 5px;
      }
    }
  }
</style>
