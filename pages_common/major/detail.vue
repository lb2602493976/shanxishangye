<template>
	<view class="page">
		<view style="width: 100%;">
			<image style="width: 100%;height: 413rpx;" :src="detail.cover"></image>
			<!-- <NewsDetailTitle :dataSource="detail"></NewsDetailTitle> -->
		</view>
		<view style="position: relative;">
			<image style="position: absolute;top: -20rpx;left: 0rpx;width: 100%;height: 960rpx;z-index: -1;" src="../../static/bg-03.jpg"></image>
		</view>
		<view  class="_news-detial-title-top">{{ detail.title}}</view>
		<view style="position: relative;">
			<image style="position: absolute;top: -64px;right: 64rpx;width: 136rpx;height: 183rpx;z-index: 1;" src="../../static/tuijian.png"></image>
		</view>
		<view class="content">
			<rich-text :nodes="detail.miContent"></rich-text>
		</view>
		<view style="border: 2px solid #D1D1D1;border-radius:30rpx;width: 664rpx; height: 80rpx;line-height: 80rpx;margin: 10rpx auto 150rpx auto;text-align: center;" @click="seeMajorList">查看学校所有专业</view>
		<view style="display: flex;justify-content: center;align-items: center;position: relative;bottom: -1rpx;">
			<image style="width: 50%;height: 116rpx;" src="../../static/p0666.png" @click="uni.navigateTo({url:'/pages_apply_consult/registration/index'})"></image>
			<image style="width: 50%;height: 116rpx;" src="../../static/zixun.png" @click="uni.navigateTo({url:'/pages_apply_consult/artificial/index'})"></image>
		</view>
	</view>
</template>

<script>
	import newsConfig from '@/config/news_config.js'
	import api from '@/api/searchSchool/school.js'
	export default{
		data(){
			return {
				newsConfig,
				//变更需要初始化的参数
				tabs:[],
				group:'',
				tabId:-1,
				currentTab:{},
				//数据
				detail:{},
				
			}
		},
		onLoad(){
			uni.showLoading()
			let detail = uni.getStorageSync('majorDetail')
			console.log(detail,'detail') 
			detail = JSON.parse(detail)
			this.detail = {
				...detail,
				title:detail.miName,
				pressTime:detail.createTime,
				num:detail.miPageView + 1,
			}
			console.log(this.detail,'this.detail')
			uni.hideLoading()
			api.addMajorViewNum({ id:this.detail.id })
		},
		methods:{
			seeMajorList(){
				if(this.detail.collegeId=='1518022203703083009'){
					// 普通中专 (三年制)
					uni.navigateTo({url:'/pages_common/major/list?active=2'})
				}else if(this.detail.collegeId=='1518021906016550914'){
					// 单招升学班（三校生）
					uni.navigateTo({url:'/pages_common/major/list?active=1'})
				}else if(this.detail.collegeId=='1518022065932779522'){
					// 五年制大专（三二分段）
					uni.navigateTo({url:'/pages_common/major/list?active=3'})
				}
				
				
			}
			
		},
	}
</script>

<style lang="scss">
	@import '~@/styles/variable.scss';
	@import '~@/styles/mixins.scss';
	._news-detial-title-top{
		color:#FFFFFF;
		font-size:36rpx;
		font-weight:bold;
		text-align: center;
		margin: 46rpx 0;
	}
	.content{
		margin:0rpx 26rpx 40rpx 26rpx;
		padding:30rpx;
		width:calc(100% - 52rpx);
		box-sizing:border-box;
		@include radius(20rpx);
		background: rgba(217, 236, 255, 0.9);
	}
</style>
