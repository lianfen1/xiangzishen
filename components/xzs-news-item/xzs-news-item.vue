<template>
	<view>
	   <navigator
	   :url="'/pages/newDetail/newDetail?id='+item._id"
	   class="nsitem">
	     <view class="pic">
	       <image class="img" :src="item.picurl" mode="aspectFill"/>
	     </view>
	     <view class="text">
	       <view class="title">
	         {{item.title}}
	       </view>
	       <view class="info">
	         <view class="block">
	           <van-icon name="clock-o" size="14" class="vanicon"/>
	           <text>{{item.publish_date}}</text>
	         </view>
	         <view class="block">
	           <van-icon name="eye-o" size="14" class="vanicon"/>
	           <text>{{item.view_count}}</text>
	         </view>      
	         <view class="block">
	           <van-icon name="user-o" size="14" class="vanicon"/>
	           <text>{{item.author}}</text>
	         </view>
	       </view>
	     </view>
	   </navigator>
 
	</view>
</template>

<script>
	export default {
		name:"xzs-news-item",
		props:{
			item:{
			      type:Object,
			      value:{
			        title:"默认测试标题",
			        author:"咸虾米"
			      }
			    }
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.nsitem{
  display: flex;
  justify-content: space-between;
  padding-bottom:30rpx;
  .pic{
    width: 220rpx;
    height: 150rpx;
    .img{
      width: 100%;
      height: 100%;
    }
  }
  .text{
    width: 440rpx;
    height: 150rpx;
    text-align:justify;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title{
      line-height: 1.4em;
      color:var(--globalColor);
      font-size: 32rpx;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;				
      text-overflow: ellipsis;	
      display: -webkit-box;		
      -webkit-line-clamp: 2;
      line-clamp: 2;					
      -webkit-box-orient: vertical;
    }
    .info{
      display: flex;
      justify-content: space-between;
      font-size: 28rpx;
      color: var(--descColor);    
      .block{
        display: flex;
        align-items: center;
      }
      .vanicon{
        color: var(--descColor);  
        margin-right: 6rpx;
      }  
    }
  }
}
</style>