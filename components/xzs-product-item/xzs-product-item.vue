<template>
	
	<view class="product" @click="clickPro(item._id)">
	  <view class="pic">
	    <image class="image" mode="widthFix" :src="item.picpath"></image>
	  </view>
	  <view class="text">
	    <view class="title">{{item.title}}</view>
	    <view class="info">
	
	      <view class="row">
	        <view class="left"><text space="emsp">货 号：</text></view>
	        <view class="right">{{item.pronum}}</view>
	      </view>
	
	      <view class="row">
	        <view class="left"><text space="emsp">等 级：</text></view>
	        <view class="right">{{item.grade}}</view>
	      </view>
	
	      <view class="row">
	        <view class="left"><text space="emsp">年 份：</text></view>
	        <view class="right">{{item.year}}</view>
	      </view>
	
	      <view class="row">
	        <view class="left">净含量：</view>
	        <view class="right">{{item.weight}}</view>
	      </view>
	
	      <view class="row">
	        <view class="left">零售价：</view>
	        <view class="right">{{item.price}}</view>
	      </view> 
	    </view>
	  </view>
	</view>

</template>

<script>
	export default {
		name:"xzs-product-item",
		props:{
			item:{
			      type:Object,
			      value:{
			        title:"默认标题"
			      }
			    }
		},
		data() {
			return {
				
			};
		},
		methods:{
			clickPro(id){
			      uni.navigateTo({
			        url: '/pages/proDetail/proDetail?id='+id
			      })
			    }
		}
	}
</script>

<style lang="scss" scoped>
.product{
  border:1px solid #eee;
}
.product .pic .image{ width:100%;}
.product .text{ padding:30rpx 20rpx;}
.product .title{ font-size: 36rpx; color:#333; border-bottom:1rpx solid #efefef; padding-bottom:20rpx;margin-bottom:10rpx; white-space: nowrap; text-overflow: ellipsis; width: 100%; overflow: hidden;}
.product .row{ font-size: 28rpx; color:#aaa; display: flex; line-height: 2em;}
.product .row .left{ font-size: 26rpx;white-space: nowrap;}
.product .row .right{ color:#666; white-space: nowrap;}
</style>