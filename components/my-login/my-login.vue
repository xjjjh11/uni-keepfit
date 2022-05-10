<template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <!-- 可以从 @getuserinfo 事件处理函数的形参中，获取到用户的基本信息 -->
    <!-- <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo" @click="getUserProfile">一键登录</button> -->
    <button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script>
  // 1. 从 vuex 中按需导入 mapState 辅助函数
  import { mapState,mapMutations } from 'vuex'
  
  export default {
    name:"my-login",
    computed: {
      // 2. 从 m_user 模块中导入需要的 token 字符串
      ...mapState('m_user', ['token','redirectInfo']),
    },
    data() {
      return {
        
      };
    },
    methods: {
      // 把 m_user 模块中的 updateUserInfo 映射到当前组件中使用
      ...mapMutations('m_user', ['updateUserInfo', 'updateToken','updateRedirectInfo']),
      // getUserInfo方法过时了
    //   // 获取微信用户的基本信息
    //   getUserInfo(e) {
    //     // 判断是否获取用户信息成功
    //     if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')
    
    //     // 获取用户信息成功， e.detail.userInfo 就是用户的基本信息
    //     // console.log(e)
    //     // 将用户的基本信息存储到 vuex 中
    //     this.updateUserInfo(e.detail.userInfo)
        
    //     // 获取登录成功后的 Token 字符串
    //     this.getToken(e.detail)
    //   },
      
       // 获取微信用户的基本信息
      getUserProfile(){
        uni.getUserProfile({
          desc: '你的授权信息',
          success: (res)=>{
            // 将信息存到 vuex 中
            this.updateUserInfo(res.userInfo)
            console.log(res)
            // 获取登录成功的 token 值
            this.getToken(res)
          },
          fail: (res) => {
            return uni.$showMsg('您取消了登录授权!')
          },
        })
      },
      
      // 调用微信登录接口
      async getToken(info) {
        const [err, res] = await uni.login().catch(err => err)
        console.log("打印uni.login()的返回值：")
        console.log(res)
        // 判断 uni.login() 是否调用失败
        if (err || res.errMsg !== 'login:ok') return uni.showErrorMessage("登录失败！")
        // 准备参数对象
        const query = {
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }
        // 获取 token
        // const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
        // console.log(loginResult)
        // if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
        const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
        uni.$showMsg('登录成功')
        // 更新 vuex 中的 token
        
        // this.updateToken(loginResult.message.token)
        this.updateToken(token)
        this.navigateBack()
      },
       
      // 登录后 回到登陆前的页面
      navigateBack() {
        if(this.redirectInfo && this.redirectInfo.openType === 'navigateTo') {
          uni.navigateTo({
            // 要导航到的页面地址
            url: this.redirectInfo.from,
            // 导航成功之后，把 vuex 中的 redirectInfo 对象重置为 null
            complete: () => {
              this.updateRedirectInfo(null)
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
.login-container {
  // 登录盒子的样式
  height: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;

  // 绘制登录盒子底部的半椭圆造型
  &::after {
    content: ' ';
    display: block;
    position: absolute;
    width: 100%;
    height: 40px;
    left: 0;
    bottom: 0;
    background-color: white;
    border-radius: 100%;
    transform: translateY(50%);
  }

  // 登录按钮的样式
  .btn-login {
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    // background-color: #c00000;
  }

  // 按钮下方提示消息的样式
  .tips-text {
    font-size: 12px;
    color: gray;
  }
}
</style>
