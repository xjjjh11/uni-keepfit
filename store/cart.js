export default {
  // 为当前模块开启命名空间
  namespaced: true,
  
  // 模块的state数据(数据都存在此处，类似 Vue 的 data 属性)
  state: () => ({
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart: JSON.parse( uni.getStorageSync('cart') || '[]')
  }),
  
  // 模块的 mutations 方法 （类似 vue 中的  methods 属性)
  // 更改vuex的store中状态的唯一方法，通过提交mutation修改状态
  mutations: {
    // 添加到购物车方法(state为访问数组的对象，goods为商品信息)
    addToCart(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      // 商品不存在购物车中则加入，已存在则只增加其数量
      if(!findResult) {
        state.cart.push(goods)
      }else {
        findResult.goods_count++
      }
      console.log(state.cart)
      // 通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法
      this.commit('m_cart/saveToStorage')
    },
    
    // 将购物车中的数据持久化存储到本地
    saveToStorage(state) {
      uni.setStorageSync('cart',JSON.stringify(state.cart))
    },
    
    // 更新购物车中商品的勾选状态
    updateGoodsState(state, goods) {
      // 根据 goods_id 查询购物车中对应商品的信息对象
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      // 有对应的商品信息对象
      if (findResult) {
        // 更新对应商品的勾选状态
        findResult.goods_state = goods.goods_state
        // 持久化存储到本地
        this.commit('m_cart/saveToStorage')
      }
    },
    
    // 更新商品的数量
    updateGoodsCount(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if (findResult) {
        findResult.goods_count = goods.goods_count
        this.commit('m_cart/saveToStorage')
      }
    },
    
    // 根据商品id删除该商品
    removeGoodsById(state, goods_id) {
      state.cart = state.cart.filter(x => x.goods_id !== goods_id)
      this.commit('m_cart/saveToStorage')
    },
    
    // 更新所有商品的勾选状态
    updateAllGoodsState(state, newState) {
      // 循环更新购物车中每件商品的勾选状态
      state.cart.forEach(x => x.goods_state = newState)
      // 持久化存储到本地
      this.commit('m_cart/saveToStorage')
    }
  },
  
  // 基于state的派生状态，可理解为组件中的计算属性（只有当它的依赖值发生了改变才会被重新计算。）
  getters: {
    // 统计购物车中商品的总数量
    total(state) {
      let c = 0
      // 循环统计商品的数量，累加到变量 c 中
      state.cart.forEach(x => c += x.goods_count )
      return c
    },
    
    // 勾选的商品的总数量
    checkedCount(state) {
    // 先使用 filter 方法，从购物车中过滤器已勾选的商品
    // 再使用 reduce 方法，将已勾选的商品总数量进行累加
    // reduce() 的返回值就是已勾选的商品的总数量
    return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
    },
    
    // 已勾选的商品的总价
    checkedGoodsAmount(state) {
      // 先使用 filter 方法，从购物车中过滤器已勾选的商品
      // 再使用 reduce 方法，将已勾选的商品数量 * 单价之后，进行累加
      // reduce() 的返回值就是已勾选的商品的总价
      // 最后调用 toFixed(2) 方法，保留两位小数
      return state.cart.filter(x => x.goods_state)
                       .reduce((total, item) => total += item.goods_count * item.goods_price, 0)
                       .toFixed(2)
    }
  },
}