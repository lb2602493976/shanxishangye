<template>
	<view class="_base_page">
		<slot></slot>
	</view>
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
	._base_page{
		@include radius(30rpx,'top');
		min-height:100vh;
		background:#FFF;
		box-sizing:border-box;
		padding-top:30rpx;
		padding-bottom:30rpx;
	}
</style>
