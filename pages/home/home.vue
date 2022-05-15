<template>
  <view>
    <!-- 使用自定义的搜索组件 -->
    <view class="search-box">
      <my-search @click="gotoSearch"></my-search>
    </view>
    
    <!-- 分类导航区 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item,i) in navList" :key="i" @click="navClickHandler(item)">
        <image :src="item.img_src" class="nav-img"></image>
        <text class="nav-name">{{item.name}}</text>
      </view>
    </view>
    
    <!-- 课程的标题 -->
    <view class="course-title">
      <text class="recommend">为你推荐</text>
      <text class="course-seemore" @click="navToCourseCate()">查看更多</text>
    </view>
    <!-- 课程列表区 -->
    <view class="course-list">
      <!-- 课程item项 -->
      <view class="course-item" v-for="(course,i) in courseList" :key="i" @click="navCourseDetail(course)">
        <!-- 左侧图片 -->
        <image src="../../static/logo.png" mode="" class="course-pic"></image>
        <!-- 右侧相关信息 -->
        <view class="course-item-right">
          <!-- 教程标题 -->
          <view class="course-name">{{course.course_name}}</view>
          <!-- 教程的类型和时长 -->
          <view class="course-type-time">{{course.course_type}} · {{course.course_duration}}分钟</view>
          <!-- 教程推荐说明 -->
          <text class="course-introduce">“{{course.course_introduce}}”</text>
        </view>
      </view>
    </view>
    
    <!-- 发现课程 -->
    <view class="courses">
      <!-- 标题 -->
      <view class="find-title">发现课程</view>
      <!-- 顶部水平滚动视图区域 -->
      <view class="scroll-view-container">
        <scroll-view class="top-scroll-view" scroll-x>
          <view :class="['top-scroll-view-item', i === active ? 'active' : '']" v-for="(item,i) in courseCateList" :key="i" @click="activeChanged(i)">
            <!-- 为选中项动态添加 .active 类名 -->
            <text class="item-text">{{item.course_cate_name}}</text>
          </view>
        </scroll-view>
      </view> 
      
      <!-- 详情 -->
      <view class="course-detail" v-for="(course,i) in findCourseList" :key="i" >
        <!-- 提供者信息 -->
        <view class="provider">
          <view class="avatar">
            <image class="avatar" :src="course.course_avatar" mode="aspectFit"><image>
          </view>
          <view class="name">{{course.course_provider}}</view>
        </view>
        <!-- 视频信息 -->
        <view class="vedio-container" @click="navCourseDetail(course)">
          <view class="vedio">
            <image :src="course.course_vedio" class="vedio">
              <button class="btn-start">开始训练</button>
            </image>
          </view>
        </view>

        <!-- 底部 课程介绍 -->
        <view class="course-bootom">
          <view class="course-bootom-info">
            <view class="course-name">{{course.course_name}}</view>
            <view class="course-type-time">{{course.course_type}} · {{course.course_duration}}</view>
          </view>
            <view class="save" @click="saveChange(isSave)">
              <image src="../../static/home_icons/save.png" class="save-img" v-if="!isSave"></image>
              <image src="../../static/home_icons/save-active.png" class="save-img" v-else></image>
              <view class="save-text" >收藏</view>
            </view>
            
          </view>
        </view>
    </view>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        navList:[
        {
          img_src: '../../static/home_icons/cate_active.png',
          name: '找课程',
          id: 1
        },
        {
          img_src: '../../static/home_icons/cate_active.png',
          name: '找课程',
          id: 2
        },
        {
          img_src: '../../static/home_icons/cate_active.png',
          name: '找课程',
          id: 3
        },
        {
          img_src: '../../static/home_icons/cate_active.png',
          name: '找课程',
          id: 4
        },
        ],
        courseList: [{
          id: 1,
          course_provider: 'keep君',
          course_name: '腹肌撕裂者初级',
          course_type: 'k2初学',
          course_duration: '9',
          course_introduce: '明星也在练的腹肌课！'
        },
        {
          id: 568,
          course_provider: 'keep君',
          course_name: '腹肌撕裂者初级',
          course_type: 'k2初学',
          course_duration: '9',
          course_introduce: '明星也在练的腹肌课！'
        },
        {
          id: 346,
          course_provider: 'keep君',
          course_name: '腹肌撕裂者初级',
          course_type: 'k2初学',
          course_duration: '9',
          course_introduce: '明星也在练的腹肌课！'
        }],
        courseCateList: [{
          course_cate_name: '全部',
          course_cate_id: 1,
        },
        {
          course_cate_name: '腹肌',
          course_cate_id: 1,
        },
        {
          course_cate_name: '全身减脂',
          course_cate_id: 1,
        },
        {
          course_cate_name: '三角肩',
          course_cate_id: 1,
        },
        {
          course_cate_name: '瘦小腿',
          course_cate_id: 1,
        },
        {
          course_cate_name: '拉伸',
          course_cate_id: 1,
        },
        {
          course_cate_name: '手臂',
          course_cate_id: 1,
        },
        {
          course_cate_name: '胸肌',
          course_cate_id: 1,
        }],
        findCourseList: [{
          id: 36,
          course_provider: 'keep君1',
          course_name: '腹肌撕裂者初级',
          course_type: 'k2初学',
          course_duration: '9',
          course_vedio: '../../static/uni.png',
          course_avatar: '../../static/cart_empty@2x.png'
        },{
          id: 37,
          course_provider: 'keep君2',
          course_name: '腹肌撕裂者初级',
          course_type: 'k2初学',
          course_duration: '9',
          course_vedio: '../../static/uni.png',
          course_avatar: '../../static/cart_empty@2x.png'
        },{
          id: 38,
          course_provider: 'keep君3',
          course_name: '腹肌撕裂者初级',
          course_type: 'k2初学',
          course_duration: '9',
          course_vedio: '../../static/uni.png',
          course_avatar: '../../static/cart_empty@2x.png'
        },{
          id: 39,
          course_provider: 'keep君4',
          course_name: '腹肌撕裂者初级',
          course_type: 'k2初学',
          course_duration: '9',
          course_vedio: '../../static/home_icons/cate_active.png',
          course_avatar: '../../static/cart_empty@2x.png'
        }],
        // 当前选中项的索引，默认让第一项被选中
        active: 0,
        // 是否收藏
        isSave: false,
      };
    },
    methods: {
      // 点击跳转到搜索页
      gotoSearch() {
        uni.navigateTo({
          url:'/subpkg/search/search'
        })
      },
      
      // 跳转到分类相关页
      navClickHandler(item) {
        if(item.name === '找课程') {
          uni.navigateTo({
            url: '/subpkg/course_cate/course_cate?id=' + item.id
          })
        }
      },
      
      // 跳转到课程分类相关页
      navToCourseCate() {
        uni.navigateTo({
          url: '/subpkg/course_cate/course_cate'
        })
      },
      
      // 跳转到课程详情页
      navCourseDetail(course) {
        uni.navigateTo({
          url: '/subpkg/course_detail/course_detail?id=' + course.id
        })
      },
      
      // 保存当前active值
      activeChanged(i) {
        this.active = i
        console.log("activeChanged:"+this.active)
        // 为二级分类列表重新赋值,即点击不同的一级分类名，显示不同的教程
        // this.cateLevel2 = this.cateList[i].children
        // 切换一级分类时，重置滚动条的值到顶端(scrollTop不能赋一样的值，故有1px误差)
        // this.scrollTop = this.scrollTop === 0 ? 1 : 0
      },
      
      // 改变收藏图标
      saveChange(isSave) {
        this.isSave = !isSave
      }
    }
  }
</script>

<style lang="scss">
  // 分类区
.nav-list{
  background-color: #FdFdFd;
  display: flex;
  justify-content: space-around;
  padding: 15px 0;
  .nav-item{
    .nav-img{
      width: 108rpx;
      height: 108rpx;
    }
    .nav-name{
      display: flex;
      font-size: 12px;
      justify-content: space-around;
    }
  }
}
// 课程的标题
.course-title{
  display: flex;
  justify-content: space-between;
  margin: 15px 15px;
  margin-top: 20px;
  .recommend{
    font-size: 20px;
    font-weight: bold;
  }
  .course-seemore{
    font-size: 12px;      
    border: 1px solid #F0F0F0;
    border-radius: 50px;
    padding: 5px 10px;
  }
}
// 课程列表区
  .course-item{
    padding: 0 15px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    .course-pic{
      margin-right: 10px;
      width: 100px;
      height: 75px;
      display: block;
    }
    .course-item-right{
      display: flex;
      // 占满整个盒子
      flex: 1;
      flex-direction: column;
      justify-content: space-around;
      .course-name{
        font-size: 16px;
        font-weight: bold;
      }
      .course-type-time{
        font-size: 13px;
        color: #696969;
      }
      .course-introduce{
        font-size: 13px;
        background-color: #e9f9f3;
        border: 1px solid #e9f9f3;
        border-radius: 8px;
        color: green;
      }
    }
  }
  
  // 发现课程
  .courses{
    
    // 标题
    .find-title{
      font-size: 20px;
      font-weight: bold;
      margin: 10px 15px;
      margin-top: 30px;
    }
    
    // 顶部水平滚动视图区域
    .scroll-view-container {
      width: 100%;
      height: 100rpx;
      
      .top-scroll-view{
        white-space: nowrap;
        height: 100rpx;
        
        .top-scroll-view-item{
          display:inline-block;
          background-color: #FdFdFd;
          text-align: center;
          border: 1px solid #FdFdFd;
          border-radius: 10px;
          margin: 0 10px;
          padding: 5px 10px;
          
          // 激活项的样式
          &.active {
            background-color: #e9f9f3;
            color: green;
            position: relative;
          }
          
          .item-text{
            font-size: 14px;
          }
        }
      }
    }

    
    // 课程详情
    .course-detail{
      border: 1px solid #fafafa;
      background-color: #fafafa;
      margin: 15px 15px;
      .provider{
        display: flex;
        align-content: center;
        // margin: 0 15px;
        margin-bottom: 10px;
        line-height: 32.5px;
        
        .avatar{
          width: 30px;
          height: 30px;
          border-radius: 15px;
          border: 1px solid #FFF;
        }
        .name{
          font-size: 16px;
          margin-left: 10px;
        }
      }
      // 视频信息
      .vedio-container{
        position: relative;
        .vedio{
          position: relative;
          width: 690rpx;
          height: 400rpx;
          // margin-right: 15px;
          
          .btn-start{
            // 定位按钮
            position: absolute;
            top: 300rpx;
            right: 30rpx;
            width: 180rpx;
            height: 80rpx;
            // border: 1px solid #FFF ;
            background-color: #39c690 ;
            font-size: 15px ; 
            color: white; 
            border-radius: 20px; 
            z-index: 99;
          }
        }
      }
      // 视频底部信息
      .course-bootom{
        display: flex;
        justify-content: space-between;
        margin: 10px 15px;
        .course-name{
          font-size: 16px;
          font-weight: bold;
        }
        .course-type-time{
          font-size: 13px;
          color: #7f7f7f;
          margin-top: 5px;
        }
        
        .save{
          display: flex;
          flex-direction: column;
          align-items: center;
          // margin-top: 15px;
          margin-right: 15px;
          .save-img{
            width: 40rpx;
            height: 40rpx;
          }
          .save-text{
            font-size: 12px;
            text-align: center;
            color: #7f7f7f;
          }
        }
        .save-img::hover{
          width: 40px;
          height: 40px;
          background-color: blue;
        }
      }
      
    }
  }
</style>
