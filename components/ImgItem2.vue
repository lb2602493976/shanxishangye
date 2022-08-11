<template>
	<view class="_img-item">
		<image :style="{ height:imgHeight }" :src="dataSource.coverPicture ? dataSource.coverPicture.split(',')[0] :''" mode="aspectFill"></image>
		<view class="_img-item-title" :style="{ background:textBgColor }" @click="$emit('titleClick',dataSource)" :class="{ ellipsis:!dataSource._expand }">{{ dataSource.tagName }}</view>
	</view>
</template>

<script>
	export default{
		props:{
			dataSource:{
				type:Object,
				default(){
					return {
						tagName:'测试标题'
					}
				},
			},
			imgHeight:{
				type:String,
				default:'210rpx',
			},
			textBgColor:{
				type:String,
				default:'#F2F2F2',
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
		@include radius(14rpx);
		@include flex(column,start,center);
		background:#F2F2F2;
		box-sizing: border-box;
		width:100%;
		height:100%;
		image{
			@include radius(14rpx,'top');
			width:100%;
		}
		._img-item-title{
			// &.ellipsis{
			// 	@include textEllipsis(1);
			// }
			@include flex();
			@include radius(14rpx,'bottom');
			text-align:center;
			width:100%;
			box-sizing:border-box;
			padding:0 20rpx;
			font-size:28rpx;
			background:#F2F2F2;
			height:86rpx;
			// line-height:86rpx;
		}
	}
</style>

