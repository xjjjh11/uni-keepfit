<template>
  <view>
    <!-- 分割条 无实际作用-->
    <view class="split-bar"></view>
    <!-- 用户动态 -->
  <view class="user-container" v-for="(user,i) in communityList" :key="i">
    <!-- 用户个人信息 -->
    <view class="userinfo">
      <view class="user">
        <image class="icon" :src="user.avatar"></image>
        <view class="name">{{user.username}}</view>
      </view>
      <view class="concern" @click="clickConcern(user.user_id,isConcern)" v-if="!isConcern">关注</view>
      <uni-icons class="concern" type="checkmarkempty" size="24" color="#green" @click="clickConcern(user.user_id,isConcern)" v-else></uni-icons>
  </view>
    <!-- 中间内容部分 -->
    <view class="minddle-contend" @click="navContendDetail(user)">
      <text class="contend-text-hide">
        {{user.text}}
        </text>
      <view class="contend-image">
        <image :src="user.content_img"></image>
      </view>
    </view>
    <!-- 底部评论点赞 -->
    <view class="bottom-comment">
      <view class="left-comment">
        <uni-icons type="hand-up" size="24" color="#979797" @click="clickLike(i,user,isLike)" v-if="!isLike "></uni-icons>
        <uni-icons type="hand-up-filled" size="24" color="#979797" @click="clickLike(i,user,isLike)" v-if="isLike"></uni-icons>
        <text>{{user.like_num}}</text>
        <uni-icons class="reply-icon" type="chatbubble" size="24" color="#979797"></uni-icons>
        <text>{{user.comment_num}}</text>
      </view>
      <button class="right-share" open-type="share">
        <uni-icons type="more-filled" size="24" color="#979797"></uni-icons>
      </button>
    </view>
  </view>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        communityList: [{
          user_id:1,
          comm_id:36,
          username: 'Fit用户',
          avatar: '../../static/life.jpg',
          text: '测试文字测试文字666666666666666666666\n'+
                  '测试文字测试文字\n'+
                  '测试文字测试文字\n'+
                  '测试文字测试文字',
          content_img: '../../static/life.jpg',
          like_num:8691,
          comment_num:2283
        },
        {
          user_id:2,
          comm_id:36,
          username: 'Fit用户',
          avatar: '../../static/life.jpg',
          text: '测试文字测试文字\n'+
                  '测试文字测试文字\n'+
                  '测试文字测试文字\n'+
                  '测试文字测试文字',
          content_img: '../../static/logo.png',
          like_num:8691,
          comment_num:2283
        },
        {
          user_id:3,
          comm_id:36,
          username: 'Fit用户',
          avatar: '../../static/life.jpg',
          text: '测试文字测试文字\n'+
                  '测试文字测试文字\n'+
                  '测试文字测试文字\n'+
                  '测试文字测试文字',
          content_img: '../../static/life.jpg',
          like_num:8691,
          comment_num:2283
        }],
        // 当前帖子
        currUser: 0,
        // 默认没关注
        isConcern: false,
        // 是否点赞
        isLike: false,
        // 是否隐藏
        isHide: true
      };
    },
    
    methods: {
      // 点击关注按钮
      clickConcern(user_id,isConcern) {
        // 未关注时：1. 修改关注样式
        this.isConcern = !isConcern
        // 2.1 增加该用户到用户关注表
        // 调用 后台接口，把该用户id 存入数据库中
        if(this.isConcern) {
          console.log("已关注，把该用户存入数据库中"+user_id)
          // 已关注：2.2 取消关注该用户
          // 调用 后台接口，通过自己id和该用户id把数据库中该关注记录删除
        }else {
          console.log("取消关注，把该用户存入从关注列表中删除！"+user_id)
        }
        
        
      },
      
      // 点赞
      clickLike(i,user,isLike) {
        this.isLike = !isLike
        // 该帖子的点赞数量+1 
        if(this.isLike){
          this.communityList[i].like_num++
          console.log("点赞数 +1 并调用相关接口")
        }else{
          this.communityList[i].like_num--
          console.log("点赞数 -1 并调用相关接口")
        }
      },
      
      // 点击跳转到详情页
      navContendDetail(user) {
        uni.navigateTo({
          url:'../../subpkg/share_detail/share_detail?user_id='+user.user_id+"&&share_id="+user.comm_id
        })
      },
    
    }
  }
</script>

<style lang="scss">
  .split-bar{
    height: 15px;
    background-color: #FaFaFa;
  }
  .user-container{
    padding: 0px 15px 15px 15px;
    border-bottom: 2px solid #FaFaFa;
    .userinfo{
      height: 60px;
      // background-color: pink;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .user{
        display: flex;
        .icon{
          width: 30px;
          height: 30px;
          border-radius: 15px;
        }
        .name{
          line-height: 30px;
          margin-left: 10px ;
        }
      }
      
      .concern{
        height: 30px;
        width: 60px;
        font-size: 14px;
        color: green;
        background-color: #e9faf3;
        text-align: center;
        line-height: 30px;
        border-radius: 20px;
      }
    }
    .minddle-contend{
      text{
        font-size: 18px;
      }
      .contend-text-hide{
        /* 多行文本溢出隐藏  省略号代替 */
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;/*设置对齐模式：垂直对齐*/
        -webkit-line-clamp: 3;/*设置多行的行数*/

      }

      .contend-image{
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        image{
          width: 220rpx;
          height: 220rpx;
        }
      }
    }
    .bottom-comment{
      // line-height: 40px;
      display: flex;
      justify-content: space-between;
      text{
        height: 20px;
        font-size: 12px;
        color: #b1b1b1;
        line-height: 20px;
        // 图标跟文字一起居中对其
        vertical-align: middle;
      }
      .reply-icon{
        margin-left: 10px;
      }
      .right-share{
        margin: 0;
        padding: 0;
        border: none;
        outline: none;
        height: 20px;
        width: 50px;
        line-height: 20px;
        background-color: #FFFFFF;
      }
    }
  }
  
  
  


  
</style>
