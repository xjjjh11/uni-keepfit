// 1.导入Vue和Vuex
import Vue from 'vue'
import Vuex from 'vuex'
// a. 导入购物车的 vuex 模块
import moduleCart from './cart.js'
// 导入用户的vuex模块
import moduleUser from './user.js'

// 2.将Vuex安装为Vue的插件
Vue.use(Vuex)

// 3.创建 Store 的实例对象
const store = new Vuex.Store({
  // TODO: 挂载 store 模块
  modules: {
    // b. 挂载购物车的 vuex 模块，通过m_cart访问moduleCart对象
    'm_cart': moduleCart,
    'm_user': moduleUser
  }
})

// 4.向外共享 Store 的实例对象
export default store