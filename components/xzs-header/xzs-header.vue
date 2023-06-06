<template>
	<view class="header">
	  <navigator url="/pages/index/index" open-type='switchTab'  class="logo">
	    <image src="/images/logo.jpg" mode="heightFix" class="pic"/>
	  </navigator>
	
	  <view class="search">
		<van-icon name="search" color="rgb(145 118 63)" class="vanicon" @click="clickSearch"/>
	  </view>
	</view>
</template>

<script>
	export default {
		name:"xzs-header",
		data() {
			return {
				
			};
		},
			
		methods:{
			clickSearch(){
				
			}
		}
	}
</script>

<style lang="scss">
.header{
  height: 120rpx;
  border:1px solid var(--themeColor);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:0 30rpx;
  .logo{
    height: 70rpx;
    .pic{
      height: 100%;
    }
  }
  .search{
    color:var(--themeColor);
    .vanicon{
      font-size: 50rpx;
	  color: var(--uni-color-warning);
    }
  }
}
</style>