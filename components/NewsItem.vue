<template>
	<view class="_news-item" :class="{ shadow }">
		<view class="_news-item-left">
			<image :src="icon" mode="aspectFill"></image>
		</view>
		<view class="_news-item-right">
			<view class="_news-item-title">{{ dataSource.title }}</view>
			<view class="_news-item-time">发布时间：{{ dataSource.pressTime }}</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			dataSource:{
				type:Object,
				default(){
					return {}
				},
			},
			shadow:{
				type:Boolean,
				default:true,
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
	._news-item{
		@include flex(row,start,center);
		@include radius(10rpx);
		background:#F2F2F2;
		padding:24rpx;
		&.shadow{
			box-shadow:$shadow;
		}
		._news-item-left{
			width:70rpx;
			height:70rpx;
			image{
				width:100%;
				height:100%;
			}
		}
		._news-item-right{
			margin-left:20rpx;
			width:calc(100% - 70rpx - 20rpx);
			._news-item-title{
				@include textEllipsis(2);
				font-size:28rpx;
				color:#000;
			}
			._news-item-time{
				margin-top:14rpx;
				font-size:24rpx;
				color:#BBB;
			}
		}
	}
</style>
