<template>
	<view>
		<xzs-header></xzs-header>
		<view class="banner">
		  <swiper
		  previous-margin="30rpx"
		  circular
		  autoplay
		  interval="3000"
		  indicator-dots
		  indicator-active-color="#BDA066"
		  indicator-color="rgba(255,255,255,0.3)"
		  >
		    <swiper-item>
		      <image src="/images/banner0.jpg" mode=""/>
		    </swiper-item>
		    <swiper-item>
		      <image src="/images/banner1.jpg" mode=""/>
		    </swiper-item>
		    <swiper-item>
		      <image src="/images/banner2.jpg" mode=""/>
		    </swiper-item>
		    <swiper-item>
		      <image src="/images/banner3.jpg" mode=""/>
		    </swiper-item>
		  </swiper>
		</view>
		
		<view class="scrollNav">
		  <scroll-view scroll-x>
		    <navigator open-type="reLaunch" class="item"
		      v-for="(item,index) in navArr" :key="item._id"
			  :url="'/pages/classify/classify?idx='+index"
		     >
		      <view class="pic">
		        <image :src="item.icon" mode=""/>
		      </view>
		      <view class="text">
		        {{item.classname}}
		      </view>
		    </navigator>
		  </scroll-view>
		</view>
		
		<view class="about">
		  <view class="pubTitle">
		    <view class="en">introduce</view>
		    <view class="cn">茶美文化馆简介</view>
		    <view class="line"></view>
		  </view>
		
		  <view class="content">
		    <view class="row">白茶，素为茶中珍品，历史悠久，属中国六大茶类之一，具有极高的收藏价值。巷子深茶美文化馆，位于泉城济南，是一家致力于弘扬茶美文化，集白茶销售、品牌、体验、品鉴于一体的综合性企业。</view>
		    <view class="row">巷子深茶美文化馆，传承卓越，与美共勉，以中式传统风格为基础，结合现代时尚格调，将观赏性与实用性、商务与休闲、体验与收藏高度融合，为顾客提供全新的体验式服务。茶舍环境优雅，可以茶会友、修身养性、品鉴收藏，感受白茶独特的文化魅力。</view>
		    <view class="row">从白茶的栽培管理到茶窖存储，每一款产品都诠释着我们追求完美的品质之心，我们拥有最佳的仓储环境，全系列白茶产品，优质的客户服务，致力于打造创新发展、诚信经营的新标杆。</view>
		  </view>
		
		</view>
		
		
		
		<view class="news">
		  <view class="pubTitle">
		    <view class="en">News</view>
		    <view class="cn">新闻资讯</view>
		    <view class="line"></view>
		  </view>
		  <view class="content">
		    <view class="box" v-for="item in newsArr" :key="index">       
		      <xzs-news-item :item="item"></xzs-news-item>
		    </view>
		  </view>
		</view>
		
		<xzs-footer></xzs-footer>
	</view>
</template>

<script>
	import {formatNum,formatTime} from "../../utils/common.js"
	import {listNav,queryNews} from "../../api/apis"
	export default {
         data() {
			return {
				navArr:[],
				newsArr:[]
			};
		},
		methods:{
			 getNavData(){
			    listNav().then(res=>{      
			        this.navArr=res.data
			    })
			
			  },
			getNewsData(){    
			   queryNews({
			      limit:3,
			      hot:true
			    }).then(res=>{
			       res.data.forEach(item=>{
			         item.view_count=formatNum(item.view_count)
			         item.publish_date=formatTime(item.publish_date,5)
			       })
			       this.newsArr=res.data
			    })
			  },
			  goclassify(id){
				  uni.reLaunch({
				  	url:`/pages/classify/classify?idx=${id}`
				  })
			  }
		},
		created() {
			this.getNavData();
			this.getNewsData();
		}
	}
</script>

<style lang="scss" scoped>
.banner{
  padding-top:30rpx;
  swiper{
    height: 460rpx;
    swiper-item{
      image{
        width: 690rpx;
        height: 460rpx;
        border-radius: 30rpx;
      }
    }
  }
}

//菜单导航
.scrollNav{
  padding:60rpx 30rpx;
  scroll-view{
	white-space: nowrap;
    .item{
	  display: inline-block;
      padding:0 25rpx;
	  margin-right: 10rpx;
	  box-sizing: border-box;
      text-align: center;
      .pic{
        width: 105rpx;
        height: 105rpx;
        image{
          width: 100%;
          height: 100%;
        }
      }
      .text{
        font-size: 32rpx;
        color:var(--globalColor);
        padding-top: 10rpx;
      }
    }
    .item:first-child{padding-left:0;}
    .item:last-child{padding-right:0;}
    
  }
}

//公司介绍
.about{
  padding:50rpx 30rpx 80rpx;
  background: url(https://mp-3309c116-4743-47d6-9979-462d2edf878c.cdn.bspapp.com/cloudstorage/fcc4ad5c-56a5-4f30-b1bc-4d1d2f1f63a2.jpg) no-repeat;
  background-size: cover;
  .content{
    .row{
      line-height: 1.6em;
      text-indent: 2em;
      font-size: 32rpx;
      padding:20rpx 0;
      border-bottom:1rpx dashed var(--themeColor);
      color:var(--focusColor)
    }
    .row:first-child{
      padding-top:0;
    }
    .row:last-child{
      padding-bottom:0;
      border-bottom:none;
    }
  }
}

.news{
  padding:50rpx 30rpx;
}
.pubTitle{
  text-align: center;
}
.pubTitle .en{
  font-size: 86rpx;
  font-weight: 900;
  text-transform: uppercase;
  color:var(--globalColor);
  opacity: 0.1;
}
.pubTitle .cn{
  font-size: 56rpx;
  font-weight: 900;
  transform: translateY(-60rpx);
  color:var(--globalColor);
}
.pubTitle .line{
  width: 100rpx;
  height: 5rpx;
  background: var(--globalColor);
  opacity: 0.6;
  display: inline-block;
  transform: translateY(-40rpx);
}
</style>
