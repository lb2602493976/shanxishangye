<template>
	<view class="_news-detial-title">
		<view v-show="dataSource.title" class="_news-detial-title-top">{{ dataSource.title}}</view>
		<view class="_news-detial-title-bottom">
			<view v-show="dataSource.pressTime" class="_news-detial-title-bottom-time">发布时间：{{ dataSource.pressTime}}</view>
			<view v-show="dataSource.num" class="_news-detial-title-bottom-view">浏览次数：{{ dataSource.num}}次</view>	
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			dataSource:{
				type:Object,
				default(){
					return {
						title:'测试标题',
						pressTime:'2020-10-20',
						num:1530,
					}
				},
			},
		},
		data(){
			return {
				
			}
		},
		onLoad(){
			
		},
		methods:{
			
		},
	}
</script>

<style lang="scss">
	@import '~@/styles/variable.scss';
	@import '~@/styles/mixins.scss';
	._news-detial-title{
		@include radius(10rpx);
		padding:50rpx 60rpx 40rpx 60rpx;
		background:$theme3;
		._news-detial-title-top{
			color:#000;
			font-size:34rpx;
			font-weight:bold;
		}
		._news-detial-title-bottom{
			@include flex(row,between,center);
			color:#666;
			font-size:24rpx;
			margin-top:32rpx;
			._news-detial-title-bottom-time{
				
			}
			._news-detial-title-bottom-view{
				
			}
		}
	}
</style>
