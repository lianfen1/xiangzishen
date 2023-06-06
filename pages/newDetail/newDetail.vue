<template>
	<view>
		<view style="padding:80rpx 30rpx;" v-if="!detail">
		  <van-skeleton title  row="5" />
		</view>
		
		<view class="detail" v-else>
		  <view class="title">
		    {{detail.title}}
		  </view>
		  <view class="info">
		    <view class="left">      
		      <text>{{detail.publish_date}}</text> 
		      <text>{{detail.author}}</text>
		      <text>{{detail.view_count}}阅读</text>
		    </view>
		    <view class="right">
		      <van-icon name="share-o" size="18" />
		      <text>分享</text>
		      <button open-type="share" class="share" size="mini">
		      享
		      </button>
		    </view>
		  </view>
		  <view class="content">    
		    <rich-text :nodes="detail.content"></rich-text>
		  </view>
		  <view class="copyright">
		    <view class="top">免责声明</view>
		    <view>本文来自网络新闻创作者，不代表巷子深小程序端的观点和立场，如有侵权请联系客服进行删除。</view>
		  </view>
		</view> 
	</view>
</template>

<script>
	import {formatTime,formatNum} from "../../utils/common"
	import {newsDetail} from "../../api/apis"
	export default {
		data() {
			return {
				detail:null
			};
		},
		methods:{
			//获取详情页数据  
			  getDetail(id){
			    newsDetail({
			      id
			    }).then(res=>{
			      res.data.publish_date=formatTime(res.data.publish_date,6)
			      res.data.view_count = formatNum(res.data.view_count)
			      res.data.content =res.data.content.replace(/<p/gi,"<p class='pstyle'");
			      res.data.content =res.data.content.replace(/<img/gi,"<img class='imgstyle'");
			      uni.setNavigationBarTitle({
			        title:res.data.title
			      })
			      this.detail=res.data
			    })
			  }
		},
		onLoad(e) {
			this.getDetail(e.id);
		}
	}
</script>

<style lang="scss" scoped>
.detail{
  padding:30rpx;
  .title{
    font-size: 50rpx;
    line-height: 1.5em;
  }
  .info{
    font-size: 28rpx;
    color:#999;
    display: flex;
    justify-content: space-between;
    padding:30rpx 0 50rpx;
    .left{
      text{
        padding-right: 15rpx;
      }
    }
    .right{
      display: flex;
      align-items: center;
      color:var(--themeColor);
      position: relative;
      .share{
        position: absolute;
        top:0;
        left:0;
        opacity: 0;
      }
      text{
        padding-left:5rpx;
      }
    }    
  }
  .content{ 
    .pstyle{
      padding:10rpx 0;
      line-height: 1.6em;
    }  
    .imgstyle{
      border-radius: 10rpx;      
    }  
  }
  .copyright{
    margin-top:30rpx;
    background:var(--globalBgColor2);
    padding:30rpx;
    font-size: 26rpx;
    color:#888;
    .top{
      font-size: 30rpx;
      padding-bottom:15rpx;
    }
  }
}
</style>
