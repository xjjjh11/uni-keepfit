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
      <view class="minddle-contend">
        <text class="contend-text">
          {{user.text}}
          </text>
        <view class="contend-image">
          <image :src="user.content_img"></image>
        </view>
      </view>
      <!-- 底部时间与分享 -->
      <view class="bottom">
        <view class="left-time">
          {{user.create_time}}
        </view>
        <button class="right-share" open-type="share">
          <uni-icons type="more-filled" size="24" color="#979797"></uni-icons>
        </button>
      </view>
    </view>
    
    <!-- 评论区 -->
    <view class="comment-container">
      <!-- 左边用户头像 -->
      <view class="left-avatar">
        <image src="../../static/home_icons/cate_active.png"></image>
      </view>
      <!-- 中间 用户名、评论的内容和相关回复内容 -->
      <view class="middle-content">
        <view class="top-username">Fit用户</view>
        <view class="middle-comment-contnet">
          测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字
        </view>
        <view class="bottom-time-reply">
          <view class="time-text">2022-5-15</view>
          <view class="reply-text">回复</view>
        </view>
        <!-- 当前评论下的回复 -->
        <view class="comment-reply-show">
          <!-- 左边头像 -->
          <view class="left-avatar">
            <image class="left-avatar" src="/static/life.jpg"></image>
          </view>
          <!-- 中间内容 -->
          <view class="middle-content">
            <view class="top-username">Fit用户</view>
            <view class="middle-comment-contnet">
              测试文字测试文字测试文字
            </view>
            <view class="bottom-time-reply">
              <view class="time-text">2022-5-15</view>
              <view class="reply-text">回复</view>
            </view>
          </view>
          <!-- 右边 点赞数 -->
          <view class="right-like">
            <uni-icons type="hand-up" size="24" color="#979797" @click="clickLike(isLike)" v-if="!isLike "></uni-icons>
            <uni-icons type="hand-up-filled" size="24" color="#979797" @click="clickLike(isLike)" v-else></uni-icons>
            <view class="like_num">11</view>
          </view>
        </view>
      </view>
      <!-- 右边 点赞数 -->
      <view class="right-like">
        <uni-icons type="hand-up" size="24" color="#979797" @click="clickLike(isLike)" v-if="!isLike "></uni-icons>
        <uni-icons type="hand-up-filled" size="24" color="#979797" @click="clickLike(isLike)" v-else></uni-icons>
        <view class="like_num">11</view>
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
          text: '测试文字测试文字\n'+
                  '测试文字测试文字\n'+
                  '测试文字测试文字\n',
          content_img: '../../static/life.jpg',
          like_num:8691,
          comment_num:2283,
          create_time: '2022-5-15 21:04'
        }],
        // 是否关注
        isConcern: false,
        // 是否点赞
        isLike: false,
        // 点击展示全部回复
        isHide: false
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
      clickLike(isLike) {
        this.isLike = !isLike
        // 该帖子的点赞数量+1 
        if(this.isLike){
          // this.communityList[i].like_num++
          console.log("点赞数 +1 并调用相关接口")
        }else{
          // this.communityList[i].like_num--
          console.log("点赞数 -1 并调用相关接口")
        }
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
      .contend-text{
        
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
    .bottom{
      display: flex;
      justify-content: space-between;
      .left-time{
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        color: #b1b1b1;
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
  
  .comment-container{
    display: flex;
    justify-content: space-between;
    padding: 30px 15px;
    .left-avatar{
      margin-right: 10px;
      image{
        width: 30px;
        height: 30px;
        border-radius: 15px;
      }
    }
    .middle-content{
      margin-right: 15px;
      .top-username{
        font-size: 12px;
        color: #707070;
        margin-bottom: 5px;
      }
      .middle-comment-contnet{
        font-size: 14px;
      }
      .bottom-time-reply{
        display: flex;
        margin: 5px 15px 0 0;
        .time-text{
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          color: #b1b1b1;
          margin-right: 10px;
        }
        .reply-text{
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          color: #707070;
        }
      }
      .comment-reply-show{
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        .left-avatar{
          // width: 50px;
          // height: 50px;
          width: 25px;
          height: 25px;
          border-radius: 12.5px;
          
        }
        .middle-content{
          margin-left: -20px;
        }
      }
    }
    
    .right-like{
      .like_num{
        margin-top: 5px;
        font-size: 12px;
        text-align: center;
      }
    }
  }
</style>
