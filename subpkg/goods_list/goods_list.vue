<template>
  <view>
    <view class="goods-list">
      <view v-for="(goods, i) in goodsList" :key="i" @click="gotoDeatil(goods)">
        <!-- 为 my-goods 组件动态绑定 goods 属性的值 -->
        <my-goods :goods="goods"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 请求参数对象
        queryObj: {
          // 查询关键词
          query: '',
          // 商品分类id
          cid: '',
          // 页码值
          pagenum: 1,
          // 每页显示多少条数据
          pagesize: 10
        },
        // 获取商品列表数据
        goodsList: [],
        // 总数量，用来实现分页
        total: 0,
        // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
        // 节流阀 防止发起额外的请求
        isloading: false
      };
    },
    onLoad(options) {
      // 将页面参数转存到this.queryObj对象中
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      // 调用获取商品列表数据的方法
      this.getGoodsList()
      console.log(options)
    },
    methods: {
      // 获取商品列表数据的方法
      async getGoodsList(cb) {
        // 打开节流阀
        this.isloading = true
        // 发起请求
        const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        // 关闭节流阀
        this.isloading = false
        // callback回调函数，&&短路运算符，cb存在则调用
        cb && cb()
        if (res.meta.status !== 200) return uni.$showMsg()
        
        // 上拉加载更多后 进行新旧数据拼接处理
        // 通过展开运算符的形式，进行新旧数据的拼接
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
      },
      // 点击跳转到商品详情页
      gotoDeatil(goods) {
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
        })
      }
    },
    // 触底事件
    onReachBottom() {
      // 判断是否还有下一页数据（当前的页码值 * 每页显示多少条数据 >= 总数条数）
      if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg("数据加载完毕！")
      
      // 判断此时是否正在请求获取数据，如果是，则不再发起额外的请求
      if(this.isloading) return
      
      // 让页码自增 +1
      this.queryObj.pagenum += 1
      // 重新获取列表数据
      this.getGoodsList()
    },
    // 监听用户的下拉刷新的事件
    onPullDownRefresh() {
      // 1. 重置关键数据
      this.queryObj.pagenum = 1
      this.total = 0
      this.isloading = false
      this.goodsList = []
    
      // 2. 重新发起请求,当获取商品列表数据后再传一个cb回调函数，停止下拉刷新效果
      this.getGoodsList(() => uni.stopPullDownRefresh())
    }
  }
</script>

<style lang="scss">

</style>
