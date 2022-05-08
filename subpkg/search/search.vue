<template>
  <view>
    <view class="search-box">
    <!-- 要想修改搜索框的背景颜色，只能在源码中修改，在uni-modules中；或者直接在该标签外层增加一个盒子；实现搜索框自动获取焦点，修改源码中data里的 show 和 showSync 为true-->
      <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
    </view>
    
    <!-- 搜索建议列表 ;搜索结果列表和历史搜索只显示一个-->
    <view class="sugg-list" v-if="searchResults.length !== 0">
      <view class="sugg-item" v-for="(item,i) in searchResults" :key="i" @click="gotoDetail(item)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <!-- 页面中渲染搜索关键词的时候，不再使用 data 中的 historyList，而是使用计算属性 historys -->
        <uni-tag :text="item" v-for="(item, i) in historys" :key="i" @click="gotoGoodsList(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 延时器的 timerId,避免多次重复搜索
        timer: null,
        // 搜索关键词
        kw: '',
        // 搜索结果列表
        searchResults: [],
        // 搜索关键词的历史记录
        historyList: ['a', 'app', 'apple']
      };
    },
    /*
      直接push()保存关键字的问题:
        1.关键词前后顺序问题（调用数组reverse()方法，进行数组反转）
        2.关键词重复问题（使用Set对象去重）
    */
   // 计算属性可以类似与data来使用，不同在于：其可以监视计算属性中的数据和对数据进行逻辑操作
    computed: {
      // 由于数组是引用类型，所以不要直接基于原数组调用 reverse 方法，以免修改原数组中元素的顺序
      // 而是应该新建一个内存无关的数组，再进行 reverse 反转
      historys() {
        return [...this.historyList].reverse()
      }
    },
    onLoad() {
      // 在onLoad生命周期中，加载本地存储的搜索历史记录（将字符串转成数组）
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    methods: {
      // input输入事件的处理函数，通过 e (e.value拿不到)拿到输入内容
      input(e) {
        // 清除timer对应的延时器
        clearTimeout(this.timer)
        // 重新启动一个延时器，并把timerId赋给this.timer
        this.timer = setTimeout(() => {
          // 500ms内没有触发新的输入时间，则为搜索关键词赋值
          this.kw = e
          console.log(this.kw)
          // 根据关键词，查询搜索建议列表
          this.getSearchList()
        }, 500)
      },
      
      // 根据搜索关键词，搜索商品建议列表
      async getSearchList() {
        // 判断关键词是否为空
        if (this.kw === '') {
          this.searchResults = []
          return
        }
        // 发起请求，获取搜索建议列表
        const { data: res } = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw })
        if (res.meta.status !== 200) return uni.$showMsg()
        this.searchResults = res.message
        
        this.saveSearchHitory()
      },
      
      // 保存搜索的历史结果
      saveSearchHitory() {
        // 直接把搜索关键词 push 到 historyList 数组中
        // this.historyList.push(this.kw)
        
        // 解决关键词重复问题
        //1、将array数组转化为set对象
        const set = new Set(this.historyList)
        // 先delete再add，确保重新搜索的值在最前面
        //2、调用set中的delete方法移除对应的元素
        set.delete(this.kw)
        // 3、向set中添加元素
        set.add(this.kw)
        //4、将set转化为数组
        this.historyList = Array.from(set)
        // 调用 uni.setStorageSync(key, value) 将搜索历史记录持久化存储到本地（把数组转成字符串存储）
        uni.setStorageSync('kw',JSON.stringify(this.historyList))
      },
      
      // 点击搜索建议的item项，跳转到商品的详情页
      gotoDetail(goods_id) {
        uni.navigateTo({
          // 指定详情页面的 URL 地址，并传递 goods_id 参数
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
        })
      },
      
      // 点击跳转到商品列表页面
      gotoGoodsList(kw) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?query=' + kw
        })
      },
      
      // 清空历史搜索记录
      cleanHistory() {
        // 清空 data 中保存的搜索历史
        this.historyList = []
        // 清空本地存储中记录的搜索历史
        uni.setStorageSync('kw', '[]')
      }
    }
  }
</script>

<style lang="scss">
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}

.sugg-list {
  padding: 0 5px;

  .sugg-item {
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .goods-name {
      // 文字不允许换行（单行文本）
      white-space: nowrap;
      // 溢出部分隐藏
      overflow: hidden;
      // 文本溢出后，使用 ... 代替
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
}

.history-box {
  padding: 0 5px;

  .history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: 13px;
    border-bottom: 1px solid #efeff4;
  }

  .history-list {
    display: flex;
    flex-wrap: wrap;

    .uni-tag {
      margin-top: 5px;
      margin-right: 5px;
    }
  }
}
</style>
