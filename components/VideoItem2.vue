<template>
	<view class="_video_item">
		<video class="_video_item_video" @play="handleVideoPlay" :id="dataSource.id" :src="dataSource.va_url" object-fit="fill" :controls="true" :poster="dataSource.coverPhoto"></video>
		<view class="_video_item_title">{{ dataSource.va_title }}</view>
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
						title:'视频标题',
						url:'',
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
			handleVideoPlay(...rest){
				console.log(rest)
				this.$emit('play',...rest)
			},
		},
	}
</script>

<style lang="scss">
	@import '~@/styles/variable.scss';
	@import '~@/styles/mixins.scss';
	._video_item{
		@include flex(column,start,center);
		// @include radius(30rpx);
		background:#F2F2F2;
		box-shadow:$shadow;
		width:100%;
		height:514rpx;
		._video_item_video{
			// @include radius(30rpx,'top');
			width:100%;
			height:400rpx;
		}
		._video_item_title{
			@include textEllipsis(1);
			font-size:30rpx;
			text-align:center;
			line-height:112rpx;
			color:#000;
		}
	}
</style>
