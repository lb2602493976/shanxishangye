<template>
	<view class="_news-item2">
		<view class="_news-item2-left">
			<image :src="dataSource.icon" mode="aspectFill"></image>
		</view>
		<view class="_news-item2-right">
			<view class="_news-item2-title">{{ dataSource.title }}</view>
			<view class="_news-item2-time">时间：{{ dataSource.pressTime }}</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			dataSource:{
				type:Object,
				default(){
					return { }
				},
			},
		},
		data(){
			return {
				icon:'',
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
	._news-item2{
		@include flex(row,start,stretch);
		@include radius(10rpx);
		// background:#F2F2F2;
		// box-shadow:$shadow;
		padding:24rpx;
		._news-item2-left{
			width:160rpx;
			height:120rpx;
			image{
				@include radius(10rpx);
				width:100%;
				height:100%;
			}
		}
		._news-item2-right{
			@include flex(column,between,start);
			width:calc(100% - 160rpx - 20rpx);
			margin-left:20rpx;
			._news-item2-title{
				font-size:28rpx;
				color:#000;
			}
			._news-item2-time{
				margin-top:14rpx;
				font-size:24rpx;
				color:rgba(0, 0, 0, 0.6);
			}
		}
	}
</style>
