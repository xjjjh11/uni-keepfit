<template>
  <view >
    <view class="provider">
      <!--  -->
      <view class="icon">
        <image class="icon" src="../../static/cart_empty@2x.png"><image>
      </view>
      <view class="name">keep君</view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
    
      };
    }
  }
</script>

<style lang="scss">
.provider{
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
    align-items: center;
    // justify-content: center;
        margin: 0 15px;
        margin-bottom: 15px;
        
        .icon{
          width: 40px;
          height: 35px;
          border-radius: 20px;
          border: 1px solid #FFF;
          // box-shadow: 0 1px 5px black;
        }
        .name{
          font-size: 16px;
        }
      }
</style>
