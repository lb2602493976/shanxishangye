<template>
	<BasePage>
		<view class="img-list">
			<view class="img-item" v-for="(item,index) of list" :key="index" @click="handlePreViewImg(item)">
				<image :src="item" ></image>
			</view>
			<End style="width:100%;"></End>
		</view>
	</BasePage>
</template>

<script>
	export default{
		data(){
			return {
				list:[],
			}
		},
		onLoad({ title }){
			let list = uni.getStorageSync('imgUrls')
			this.list = JSON.parse(list)
			console.log(title,'titlee')
			uni.setNavigationBarTitle({ title })
		},
		methods:{
			handlePreViewImg(url){
				uni.previewImage({
					current:url,
					urls:this.list
				})
			},
		},
	}
</script>

<style lang="scss">
	@import '~@/styles/variable.scss';
	@import '~@/styles/mixins.scss';
	.img-list{
		display:flex;
		flex-flow:row wrap;
		justify-content: space-between;
		align-items:center;
		overflow-y: auto;
		box-sizing:border-box;
		padding:0 40rpx;
		.img-item{
			width:calc(50% - 8rpx);
			height:222rpx;
			image{
				width:100%;
				height:100%;
			}
			&:not(:first-child,:nth-child(2)){
				margin-top: 16rpx;
			}
		}
	}
</style>
