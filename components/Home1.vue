<template>
	<view>
		
		<view class="pages" @click="uni.navigateTo({url:'/pages_vote/index'})">
			<!-- <button style="pages" open-type="share"> -->
			
				<image class="img" src="https://zhaosheng.kanxiaowang.com:8443/images/675386589c2940fa8805836bdcf0f6641655704391072.png"></image>
				<!-- <view class="share-event">
					分享活动
				</view> -->
				
				<button class="share-event">晚会投票</button>
		</view>
		
	</view>
	
</template>
<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			callBack(){
				uni.switchTab({url:'/pages/index/index'})
			}
		},
	}
	
	
</script>

<style lang="scss">
	.pages1{
		width: 144rpx;
		height: 144rpx;
		position: fixed;
		top: 65%;
		right: 20rpx;
		z-index: 1000; 
		// background-color: #3E1CD6;
		background-image: linear-gradient(0deg,#921CD6,#EE4CF7);
		border-radius:50%;
		// border: 6rpx solid #417BFF; 
		text-align: center;
		
		.img{
			width: 65rpx;
			height: 65rpx;
			margin-top: 15rpx;
			// padding: 10rpx;
		}
		.share-event{
			font-size: 24rpx;
			line-height: 35rpx;
			color:#ffffff;
			// margin-bottom: 5rpx;
		}
		
		
	}
	.pages{
		width: 144rpx;
		height: 144rpx;
		position: fixed;
		top: 75%;
		right: 20rpx;
		z-index: 1000; 
		// background-color: #3E1CD6;
		// background-image: linear-gradient(0deg,#fa897b,#ffdd94);
		// background-image: linear-gradient(0deg,#fa897b,#ffdd94);
		background-image: linear-gradient(0deg,#b22222,#fef972);
		// background-color: red;
		border-radius:50rpx;
		// border: 6rpx solid #417BFF; 
		text-align: center;
		
		.img{
			width: 75rpx;
			height: 64rpx;
			margin-top: 10rpx;
			// padding: 10rpx;
		}
		// .share-event{
		// 	font-size: 24rpx;
		// 	line-height: 56rpx;
		// 	color:#ffffff;
		// }
		.share-event{
			width: 150rpx;
			height: 144rpx;
			background-color: transparent;
			border: 0;
			font-size: 24rpx;
			line-height: 56rpx;
			color:#ffffff;
			border-radius:50%;
			position:absolute;
			bottom:10rpx;
			left:0;
			padding-top: 80rpx;
		}
		
	}
	
	
	
	
	
</style>