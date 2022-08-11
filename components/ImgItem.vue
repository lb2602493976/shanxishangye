<template>
	<view class="_img-item">
		<image :src="dataSource.url" mode="aspectFill"></image>
		<view class="_img-item-title" @click="$emit('titleClick',dataSource)" :class="{ ellipsis:!dataSource._expand }">{{ dataSource.name }}</view>
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
	._img-item{
		// @include radius();
		@include flex(column,start,center);
		background:#FFF;
		box-sizing: border-box;
		width:100%;
		height:100%;
		padding:20rpx 0;
		image{
			// @include radius(10rpx);
			width:296rpx;
			height:198rpx;
		}
		._img-item-title{
			&.ellipsis{
				@include textEllipsis(1);
			}
			padding:0 20rpx;
			font-size:28rpx;
			margin-top:16rpx;
			background:#F2F2F2;
			
		}
	}
</style>

