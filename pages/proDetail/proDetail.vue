<template>
	<view>
		<xzs-header></xzs-header>
		
<!-- 		 <view style="padding:50rpx 30rpx; min-height: 50vh;">
		  <van-skeleton title row="5" />
		</view> -->
		
		<view class="detail">
		  <view class="banner">
		    <image :src="detail.picpath"></image>
		  </view>
		
		  <view class="textMain">
		    <view class="title">
		      {{detail.title}}
		    </view>
		
		    <view class="text">
		    
		        <view class="row">
		          <view class="left"><text space="emsp">货 号：</text></view>
		          <view class="right">{{detail.pronum}}</view>
		        </view>
		
		        <view class="row">
		          <view class="left"><text space="emsp">等 级：</text></view>
		          <view class="right">{{detail.grade}}</view>
		        </view>
		
		        <view class="row">
		          <view class="left"><text space="emsp">年 份：</text></view>
		          <view class="right">{{detail.year}}</view>
		        </view>
		
		        <view class="row">
		          <view class="left"><text space="emsp">净含量：</text></view>
		          <view class="right">{{detail.weight}}</view>
		        </view>
		
		        <view class="row">
		          <view class="left"><text space="emsp">零售价：</text></view>
		          <view class="right">{{detail.price}}</view>
		        </view>    
		    </view>
		  </view>
		</view>
		 
		
		<xzs-footer></xzs-footer>

	</view>
</template>

<script>
	import {getProductDetail} from '../../api/product.js'
	export default {
		data() {
			return {
				detail:''
			};
		},
	    onLoad(e) {
	    	getProductDetail({
				id:e.id
			}).then(res=>{
				this.detail=res.data
				console.log(this.detail);
			})
	    }
	}
</script>

<style lang="scss" scoped>
.banner{ width:750rpx; height: 750rpx;}
.banner image{ width: 100%; height: 100%;}
.textMain{ padding:80rpx 30rpx;}
.textMain .title{ border-bottom:1px solid #dedede; padding-bottom:50rpx; font-size: 50rpx; color:#333;}
.textMain .text{ border-top:1px solid #dedede; margin-top:50rpx; padding-top:60rpx;}
.textMain .row{ display: flex; padding-bottom:30rpx;}
.textMain .row .left{ font-size: 34rpx; color:#888}
.textMain .row .right{ font-size: 38rpx; color:#666; padding-left:30rpx; }
</style>
