<template>
	<view>
		<xzs-header></xzs-header>
		<view class="banner">
		  <image class="pic" src="/images/teaBanner.jpg" mode="aspectFill"/>
		</view>
		<view class="nav">
		  <van-tabs 
		  border
		  color="#BDA066"
		  title-active-color="#BDA066"
		  :active="navActive"
		  id="myTabs"
		  @click="navChange"
		  ref='myTabs'
		  >
		    <van-tab  :title="item.classname" :key="index" v-for="(item,index) in navArr"></van-tab>    
		  </van-tabs>
		</view>
		
		<view class="content">
		    <view class="body">
		      <view class="box" v-for="(item,index) in proArr" :key="index">
		        <xzs-product-item :item="item"></xzs-product-item>
		      </view>
		    </view>
		    <view class="loadOut">
		      <van-loading size="24px" v-if="loading">加载中...</van-loading>
		      <view class="noData" v-if="isData">没有更多数据了~</view>
		    </view>
		</view>
		
		<xzs-footer></xzs-footer>
	</view>
</template>

<script>
	import {listNav,queryProduct} from "../../api/apis.js"
	export default {
		data() {
			return {
				navActive:0,
			    navArr:[],
			    proArr:[],
			    loading:false,
			    isData:false,
				navid:''
			};
		},
		methods:{
			  //获取分类导航
			  async getNavList(){
			    await listNav().then(res=>{
			      this.navArr=res.data
				  this.$refs.myTabs.resize()
			    })
			  },
			  //获取产品列表
			    getProductList(s=0){
			      this.loading=true
			      queryProduct({
			        navid:this.navid,
			        size:s
			      }).then(res=>{   
			        let oldArr= this.proArr;
			        let newArr=oldArr.concat(res.data)
			        this.proArr=newArr
			          this.loading=false
			        if(res.total == this.proArr.length){
			          this.isData=true
			        }
			      })
			    },
			  
			    //导航条切换事件
			    navChange(e){    
			        let index= e?.detail?.index ?? e;
			         this.navid = this.navArr[index]._id
			        this.proArr=[]
			        this.loading=false
			        this.isData=false
			        this.navActive=Number(index)  
			        this.getProductList();
			    }

		},
		async onLoad(e) {
			   let {idx} = e;    
			    await this.getNavList(); 
			    if(idx){
			      this.navChange(idx);
			    }else{
			      this.navid = this.navArr[0]._id;
			      this.getProductList();
			    }
		},
		 onReachBottom() {
		    if(this.isData) return;
		    this.getProductList(this.proArr.length)
		  }
	}
</script>

<style lang="scss" scoped>
.banner{
  width: 100%;
  height: 460rpx;
  .pic{
    width: 100%;
    height: 100%;
  }
}
.content{
  .body{
    padding:50rpx 30rpx;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .box{
      width: 330rpx;     
      margin-bottom:30rpx; 
    }
  }
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
