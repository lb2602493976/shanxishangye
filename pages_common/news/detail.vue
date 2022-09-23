<template>
	<view class="page">
		<template v-if="detail.newsType === '1'">
			<view class="title">
				<NewsDetailTitle :dataSource="detail"></NewsDetailTitle>
			</view>
			<view class="content">
				<rich-text v-html="detail.content"></rich-text>
			</view>
			<view class="enclosure-list">
				<view v-for="item of detail.enclosureList" :key="item.id" class="enclosure-item">
					<Enclosure></Enclosure>
				</view>
			</view>
		</template>
		<template v-else-if="detail.newsType === '2'">
			<web-view :src="detail.articleUrl"></web-view>
			<!-- <view class="title">
				<NewsDetailTitle :dataSource="detail"></NewsDetailTitle>
			</view>
			<view class="content">
				<rich-text v-html="detail.content"></rich-text>
			</view>
			<view class="enclosure-list">
				<view v-for="item of detail.enclosureList" :key="item.id" class="enclosure-item">
					<Enclosure></Enclosure>
				</view>
			</view> -->
		</template>
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
				detail:{
					content:'',
					enclosureList:[],
					imgList:[],
				},
				
			}
		},
		onLoad({ id }){
			this.id = id
			console.log(this.id,'idddd')
			this.handleSearch()
		},
		methods:{
			previewImg(item,index,list){
				uni.previewImage({
					current:index,
					urls:list.map(item => item.picture),
				})
			},
			handleSearch(){
				api.addNewsViewNum(this.id).then(()=>{
					this.handleSearchNewsDetail(this.id)
				})
			},
			handleSearchNewsDetail(id){
				uni.showLoading()
				return api.getNewsDetail({ id }).then(res=>{
					this.detail = res.result
					console.log(this.detail,'this.detail')
				}).finally(()=>{
					uni.hideLoading()
				})
			},
		},
	}
</script>

<style lang="scss">
	@import '~@/styles/variable.scss';
	@import '~@/styles/mixins.scss';
	.page{
		// .title{
		// 	margin:
		// }
		.tab-container{
			position:fixed;
			top:0;
			left:0;
			width:750rpx;
			z-index:100,
		}
		.content{
			margin:0rpx 28rpx 0rpx 28rpx;
			padding:50rpx 30rpx;
			background:#FFF;
		}
		.enclosure-list{
			margin:24rpx 28rpx 40rpx 28rpx;
			.enclosure-item{
				@include space(16rpx,top);
			}
		}
		// .img-list{
		// 	margin:150rpx 28rpx 0rpx 28rpx;
		// 	display:flex;
		// 	flex-flow:row wrap;
		// 	justify-content:space-between;
		// 	align-items: center;
		// 	.img-item{
		// 		width:336rpx;
		// 		height:250rpx;
		// 		image{
		// 			@include radius(10rpx);
		// 			width:100%;
		// 			height:100%;
		// 		}
		// 		&:not(:first-child):not(:nth-child(2)){
		// 			margin-top:20rpx;
		// 		}
		// 	}
		// }
	}
	
</style>
