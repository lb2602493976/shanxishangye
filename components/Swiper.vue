<template>
	<view class="_swiper-container">
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500" :circular="true">
			<swiper-item v-for="(item,index) in dataSource" :key="index">
				<view class="swiper-item">
					<image :src="item.picUrl" mode="aspectFill" @click="handleNav(item.picHref)"></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default{
		props:{
			dataSource:{
				type:Array,
				default(){
					return []
				},
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/styles/variable.scss';
	@import '~@/styles/mixins.scss';
	._swiper-container{
		margin-top:40rpx;
		position:relative;
		z-index:10;
		
		.swiper{
			@include radius(25rpx);
			background:#FFF;
			box-shadow:$shadow;
			overflow:hidden;
			height:246rpx;
			width:calc(100% - 80rpx);
			margin:0 40rpx;
			.swiper-item{
				@include radius(25rpx);
				width:100%;
				height:100%;
				image{
					@include radius(25rpx);
					width:100%;
					height:100%;
				}
			}
		}
	}
</style>
