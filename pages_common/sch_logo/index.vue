<template>
	<view class="page">
		<view class="play" v-for="item of bottomImgList" @click="toProgram(item)">
		<!-- <view class="play" v-for="item of bottomImgList" @click="clickDetail(item)"> -->
			<image class="img" :src="item.pic"></image>
			<!-- <view class="title">
				{{item.schName}}
			</view> -->
		</view>
		<End></End>
	</view>
</template>


<script>
	import api from '@/api/searchSchool/school.js'
	export default{
		data(){
			return{
				bottomImgList:[]
			}
		},
		onLoad() {
			this.getShipSchool()
		},
		methods:{
			clickDetail(){
				uni.navigateTo({
					url:"/pages_common/sch_logo/detail"
				})
			},
			getShipSchool(){
				api.friendShipSchool({tenantId:this.tenantId}).then(res=>{
					this.bottomImgList=res.result
				})
			},
			toProgram(item){
				if(item.appId && item.appKey){
					uni.navigateToMiniProgram({
					  appId:item.appId,
					  success:(res)=> {
					    // 打开成功
					  },
					  fail:(err)=>{
						  if(err.errMsg!=="navigateToMiniProgram:fail cancel"){
							  uni.showToast({ title:'配置小程序appId错误',icon:'none' })
							  console.log(err,'获取appid失败') 
						  }else{
							  console.log(err,'取消') 
						  }
					  }
					})
				}else{
					return uni.showToast({ title:'没有小程序或不属于此平台',icon:'none' })
				}
			},
		},
		
	}
</script>

<style lang="scss" >
	@import '~@/styles/variable.scss';
	@import '~@/styles/mixins.scss';
	.page{
		margin: 20rpx 40rpx;
		padding: 40rpx;
		background: rgba(217, 236, 255, 1);
		@include radius(30rpx);
		.play{
			@include flex(row,start,center);
			width: 100%;
			border-bottom: 2rpx solid #e3e3e3;
			// margin: 20rpx;
			.img{
				// width: 160rpx;
				// height: 120rpx;
				// @include radius(20rpx);
				// margin-bottom: 20rpx;
				width: 100%;
				height: 200rpx;
				@include radius(20rpx);
				margin-bottom: 20rpx;
			}
			.title{
				width: 400rpx;
				margin-left: 20rpx;
				word-break: break-all;  /* break-all(允许在单词内换行。) */
				text-overflow: ellipsis;  /* 超出部分省略号 */
				display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
				-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
				// -webkit-line-clamp: 1; /** 显示的行数 **/
				// margin-left: 60rpx;
				// margin-right: 280rpx;
			}
		}
		
	}
</style>