<template>
  <view class="goods-item">
    <!-- 商品左侧图片区域 -->
    <view class="goods-item-left">
      <!-- 使用 v-if 指令控制 radio 组件的显示与隐藏 -->
      <radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
      <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
    </view>
    <!-- 商品右侧信息区域 -->
    <view class="goods-item-right">
      <!-- 商品标题 -->
      <view class="goods-name">{{goods.goods_name}}</view>
      <view class="goods-info-box">
        <!-- 商品价格 -->
        <view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
        <!-- 商品数量  数量发生变化调用@change方法-->
        <uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numberChangeHandler"></uni-number-box>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-goods",
    // 定义 props 属性，用来接受外界传递到当前组件的数据
    props: {
      // 商品的信息对象
      goods: {
        type: Object,
        default: {},
      },
      // 是否展示图片左侧的 radio
      showRadio: {
        type: Boolean,
        default: false // 如果外界没有指定show-radio的值，默认不展示radio组件
      },
      // 是否展示价格右侧的 NumberBox 组件
      showNum: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
      };
    },
    methods:{
      // radio 组件的点击事件处理函数
      radioClickHandler() {
        // 通过 this.$emit() 触发外界通过 @ 绑定的 radio-change 事件，
        // 同时把商品的 Id 和 勾选状态 作为参数传递给 radio-change 事件处理函数
        this.$emit('radio-change',{
          // 商品id
          goods_id: this.goods.goods_id,
          // 商品最新的勾选状态
          goods_state: !this.goods.goods_state
        })
      },
      
      // NumberBox 组件的 change 时间处理函数
      numberChangeHandler(val) {
        // 通过 this.$emit() 触发外界通过 @ 绑定的 num-change 事件
        this.$emit('num-change', {
          // 商品的 Id
          goods_id: this.goods.goods_id,
          // 商品的最新数量 ‘+val’保证是数值
          goods_count: +val
        })
      }
    },
    filters: {
      tofixed(num) {
        // 返回一个两位小数的数
        return Number(num).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
  .goods-item{
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #F0F0F0;
    .goods-item-left{
      margin-right: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .goods-pic{
        width: 100px;
        height: 100px;
        display: block;
      }
    }
    
    .goods-item-right{
      display: flex;
      // 占满整个盒子
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      
      .goods-name{
        font-size: 13px;
      }
      .goods-info-box{
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .goods-price{
          color: #C00000;
          font-size: 16px;
        }
      }
    }
  }
</style>
