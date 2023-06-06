<template>
	<view>
		<xzs-header></xzs-header>
		<view class="news">
		  <view class="content">
		    <view class="box" v-for="(item,index) in newsArr" :key="index">
		      <xzs-news-item :item="item"></xzs-news-item>
		    </view>
		  </view>
		
		  <view class="loadOut">
		    <van-loading size="24px" v-if="loading">加载中...</van-loading>
		    <view class="noData" v-if="isData">没有更多数据了~</view>
		  </view>
		</view>
	</view>
</template>

<script>
	import {queryNews} from "../../api/apis"
	import {formatNum,formatTime} from "../../utils/common.js"
	export default {
		data() {
			return {
				newsArr:[],
				loading:false,
				isData:false
			};
		},
		methods:{
			  //获取新闻列表
			  getNewsData(size=0){    
			    this.loading=true
			    queryNews({
			      limit:8,
			      size
			    }).then(res=>{
			      res.data.forEach(item=>{
			        item.view_count=formatNum(item.view_count)
			        item.publish_date=formatTime(item.publish_date,5)
			      })
			      let oldData = this.newsArr      
			      let newData = oldData.concat(res.data);   
			      uni.stopPullDownRefresh()  
			      this.newsArr=newData
			      this.loading=false
			      if(this.newsArr.length == res.total){
			        this.isData=true
			      }
			    })
			  }
		},
		created() {
		   this.getNewsData()
		}
	}
</script>

<style lang="scss" scoped>
.news{
  padding:30rpx;
  .loadOut{
    text-align: center;
    padding:30rpx 0;
    .noData{
      font-size: 30rpx;
      color:#666;
    }
  }
}
</style>
