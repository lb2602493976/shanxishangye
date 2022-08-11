<template>
	<view class="_enclosure">
		<view class="_enclosure_icon">
			<image src="../static/p017.png" mode="aspectFit"></image>
		</view>
		<view class="_enclosure_content">
		<!-- 	<view class="_enclosure_content_label">
				<image src="../static/p017.png"></image>
			</view> -->
			<view class="_enclosure_content_name">
				附件：{{ dataSource.name }}
			</view>	
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
						id:1,
						name:'阿三打撒撒大苏打实ASDASDASD打实大撒大撒大撒大大撒旦.doc',
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
	._enclosure{
		// @include radius(10rpx);
		@include flex(row,start,center);
		// border:2rpx solid #D1D1D1;
		padding:28rpx 20rpx;
		background:#FFF;
		._enclosure_icon{
			width:64rpx;
			height:78rpx;
			image{
				width:100%;
				height:100%;
			}
		}
		._enclosure_content{
			@include flex(row,start,center);
			font-size:28rpx;
			margin-left:24rpx;
			color:#666;
			._enclosure_content_label{
				margin-right:20rpx;
				// white-space: nowrap;
				image{
					width:64rpx;
					height:78rpx;
				}
			}
			._enclosure_content_name{
				// @include textEllipsis(1);
				// text-decoration:underline;
			}
		}
	}
</style>
