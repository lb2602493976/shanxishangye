<template>
	<view class="_end">到底了</view>
</template>

<script>
	export default{
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
	._end{
		@include flex(row,center,center);
		font-size:18rpx;
		color:#BBB;
		margin:100rpx 40rpx 70rpx 40rpx;
		&:before{
			content:'';
			width:100rpx;
			border-top:2rpx dashed #BBB;
			margin-right:24rpx;
		}
		&:after{
			content:'';
			width:100rpx;
			border-top:2rpx dashed #BBB;
			margin-left:24rpx;
		}
	}
</style>
